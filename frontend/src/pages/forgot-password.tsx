import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setcomplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setcomplete(true)
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box> Email with password rest insturctions sent!</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
              <Button
                type="submit"
                colorScheme="teal"
                mt={4}
                isLoading={isSubmitting}
              >
                Send Token
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}
export default withUrqlClient(createUrqlClient)(ForgotPassword)
