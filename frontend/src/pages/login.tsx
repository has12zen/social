import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import Wrapper from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { toErrorMap } from '../util/toErrorMap'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../util/createUrqlClient'
import NextLink from 'next/link'
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values)
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors))
          } else if (res.data?.login.user) {
            if (typeof router.query.next == 'string') {
              router.push(router.query.next)
            } else router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username Or Email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot Password</Link>
              </NextLink>
            </Flex>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default withUrqlClient(createUrqlClient)(Login)
