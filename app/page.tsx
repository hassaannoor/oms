'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/router'

export default function LoginPage() {
   return (
    <div>
        <Button>
            <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
    </div>
   )

    


//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [errors, setErrors] = useState({ username: '', password: '' })

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     let newErrors = { username: '', password: '' }

//     if (!username) {
//       newErrors.username = 'PLEASE FILL IN THIS FIELD'
//     }
//     if (!password) {
//       newErrors.password = 'PLEASE FILL IN THIS FIELD'
//     }

//     if (newErrors.username || newErrors.password) {
//       setErrors(newErrors)
//       return
//     }

//     // TODO: Implement actual login logic here
//     console.log('Logging in with', username, password)
//   }

//   const clearError = (field: 'username' | 'password') => {
//     setErrors(prev => ({ ...prev, [field]: '' }))
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <div className="flex justify-center mb-6">
//           <Logo />
//         </div>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onFocus={() => clearError('username')}
//               className={errors.username ? 'border-red-500' : ''}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//             )}
//           </div>
//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onFocus={() => clearError('password')}
//               className={errors.password ? 'border-red-500' : ''}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>
//           <Button type="submit" className="w-full">Log In</Button>
//         </form>
//         <div className="mt-4 text-center">
//           <Link href="/signup" className="text-primary hover:underline">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
}

