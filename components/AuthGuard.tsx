import { ReactNode } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  allowedRoles: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { status } = useAuth(allowedRoles)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <>{children}</>
}