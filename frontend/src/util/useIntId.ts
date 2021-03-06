import { useRouter } from 'next/router'

export const useIntId = () => {
  const router = useRouter()
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
  return intId
}
