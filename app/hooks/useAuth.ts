import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useAuth(allowedRoles: string[]) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(`/auth/login?callbackUrl=${router.asPath}`)
      return
    }

    if (!allowedRoles.includes(session.user?.role as string)) {
      router.push('/unauthorized')
    }
  }, [session, status, router, allowedRoles])

  return { session, status }
}