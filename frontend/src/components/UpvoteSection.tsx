import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'

interface UpvoteSectionProps {
  post: PostSnippetFragment
}

const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loading, setLoading] =
    useState<'up-loading' | 'down-loading' | 'not-loading'>('not-loading')
  const [, vote] = useVoteMutation()
  // console.log('post', post)
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="upvote"
        onClick={async () => {
          if (post.voteStatus === 1) return
          setLoading('up-loading')
          await vote({ postId: post.id, value: 1 })
          setLoading('not-loading')
        }}
        color={post.voteStatus === 1 ? 'green' : undefined}
        isLoading={loading === 'up-loading'}
        icon={<ChevronUpIcon />}
        size="24px"
      />
      {post.points}
      <IconButton
        aria-label="downvote"
        isLoading={loading === 'down-loading'}
        color={post.voteStatus === -1 ? 'red' : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) return
          setLoading('down-loading')
          await vote({ postId: post.id, value: -1 })
          setLoading('not-loading')
        }}
        icon={<ChevronDownIcon />}
        size="24px"
      />
    </Flex>
  )
}
export default UpvoteSection
