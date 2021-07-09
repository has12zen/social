import React from 'react'
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../util/constants'
import { useRouter } from 'next/router'
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  let Body = null
  //data loading
  if (fetching) {
  } else if (!data?.me) {
    Body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={4}>Register</Link>
        </NextLink>
      </>
    )
    //User is logged in
  } else {
    Body = (
      <Flex mr={4} align="center">
        <Button as={Link} href="/create-post" mr={4}>
          Create Post
        </Button>
        <Box mr={6}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout()
            router.reload()
          }}
          isLoading={logoutFetching}
        >
          Log Out
        </Button>
      </Flex>
    )
  }
  return (
    <Flex
      zIndex={1}
      align="center"
      position="sticky"
      top={0}
      bg="tomato"
      p={4}
      m="auto"
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>LeTweet</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{Body}</Box>
      </Flex>
    </Flex>
  )
}
export default Navbar
