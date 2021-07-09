import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import UpvoteSection from '../components/UpvoteSection'
import EditDeleteButtons from '../components/EditDeleteButtons'
import { useMeQuery, usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  })
  const [{ data, error, fetching }] = usePostsQuery({ variables })
  if (!fetching && !data)
    return (
      <div>
        <div>{error?.message}</div>
        Something went wrong
      </div>
    )
  return (
    <Layout>
      <Stack spacing={8}>
        {!data && fetching ? (
          <div>Loading...</div>
        ) : data ? (
          data.posts.posts.map((p) =>
            !p ? null : (
              <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
                <UpvoteSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id].tsx" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <Box ml="auto">
                      <EditDeleteButtons creatorId={p.creatorId} id={p.id} />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )
        ) : null}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
