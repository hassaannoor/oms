'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'

export default function HomePage() {

    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    if (status === 'loading') {
        return <Loading />
    }

    return (
        <div>
            
            {/* <Button>
            <Link href={"/dashboard"}>Dashboard</Link>
        </Button> */}
        </div>
    )
}

