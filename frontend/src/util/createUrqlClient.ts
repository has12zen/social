import {
  dedupExchange,
  errorExchange,
  fetchExchange,
  gql,
  ssrExchange,
} from 'urql'
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  VoteMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
} from '../generated/graphql'
import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache'
import { betterUpdateQuery } from './betterUpdateQuery'
import Router from 'next/router'

import { stringifyVariables } from '@urql/core'
import { isServer } from './constants'

export type MergeMode = 'before' | 'after'

export interface PaginationParams {
  offsetArgument?: string
  limitArgument?: string
  mergeMode?: MergeMode
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(entityKey, fieldKey)
    let hasMore = true
    info.partial = !isItInTheCache
    const result: string[] = []
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMoreData = cache.resolve(key, 'hasMore')
      if (!_hasMoreData) hasMore = _hasMoreData as boolean
      console.log('key', _hasMoreData)
      result.push(...data)
    })

    const obj = { __typename: 'PaginatedPost', posts: result, hasMore }

    console.log('thing returned', obj)
    return obj
  }
}

const invalidateCache = (cache: Cache) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts')
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {})
  })
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = ''
  if (isServer()) cookie = ctx?.req.headers.cookie
  return {
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              try {
                cache.invalidate({
                  __typename: 'Post',
                  id: (args as DeletePostMutationVariables).postId,
                })
              } catch (err) {
                console.log(err)
              }
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                  }
                `,
                { id: postId } as any
              )
              if (data) {
                if (data.voteStatus === value) return
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any
                )
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateCache(cache)
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      me: result.login.user,
                    }
                  }
                }
              )
              invalidateCache(cache)
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return {
                      me: result.register.user,
                    }
                  }
                }
              )
            },
          },
        },
      }),
      ssrExchange,
      errorExchange({
        onError(error) {
          console.error(error)

          if (error.message.includes('Not Authenticated'))
            Router.replace('/login')
        },
      }),
      fetchExchange,
    ],

    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie ? { cookie } : undefined,
    },
  }
}
