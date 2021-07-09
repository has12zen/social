import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

interface EditDeleteButtonsProps {
  id: number
  creatorId: number
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  creatorId,
  id,
}) => {
  const [{ data }] = useMeQuery()
  const [, deletePost] = useDeletePostMutation()
  if (data?.me?.id !== creatorId) return null
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          ml="auto"
          icon={<EditIcon />}
          aria-label="Edit Post"
        />
      </NextLink>
      <IconButton
        ml="auto"
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ postId: id })
        }}
      />
    </Box>
  )
}
export default EditDeleteButtons
