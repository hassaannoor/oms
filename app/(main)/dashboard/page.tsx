'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Loading from '@/components/Loading'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login')
//     }
//   }, [status, router])

  if (status === 'loading') {
    return <Loading/>
  }

  if (status === 'unauthenticated') {
    return (
        <Link href="/login">
          <Button className="w-full">Please Login</Button>
        </Link>
    )
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <p className="mb-4">Welcome, {session?.user?.name || 'User'}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/members">
          <Button className="w-full">Manage Members</Button>
        </Link>
        <Link href="/projects">
          <Button className="w-full">Manage Projects</Button>
        </Link>
        <Link href="/departments">
          <Button className="w-full">Manage Departments</Button>
        </Link>
      </div>
    </div>
  )
}

