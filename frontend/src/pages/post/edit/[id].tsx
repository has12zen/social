import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { createUrqlClient } from '../../../util/createUrqlClient'
import { isAuth } from '../../../util/isAuth'
import { useIntId } from '../../../util/useIntId'

interface UpdatePostProps {}

const UpdatePost: React.FC<UpdatePostProps> = ({}) => {
  const router = useRouter()
  const intId = useIntId()
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { postId: intId },
  })
  const [, updatePost] = useUpdatePostMutation()
  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }
  // isAuth()
  if (!data?.post)
    return (
      <Layout>
        <div>something went wrong</div>
      </Layout>
    )
  return (
    <Layout>
      <Formik
        initialValues={{ title: data?.post?.title, text: data?.post?.text }}
        onSubmit={async (values, { setErrors }) => {
          await updatePost({ id: intId, ...values })
          // if (!error)
          router.back()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="Text"
                label="Text"
                textArea
              />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(UpdatePost)
