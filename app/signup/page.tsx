'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { hash } from 'bcrypt'

export default function SignUpPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    let newErrors = { username: '', password: '' }

    if (!username) {
      newErrors.username = 'PLEASE FILL IN THIS FIELD'
    }
    if (!password) {
      newErrors.password = 'PLEASE FILL IN THIS FIELD'
    }
    if (password !== confirmPassword) {
      newErrors.password = 'PASSWORDS DO NOT MATCH'
    }

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ 
          username: data.error === 'Username already exists' ? data.error : '', 
          password: ''
        })
        return
      }

      setSuccessMessage('Account Created Successfully')
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ 
        username: 'An error occurred during signup', 
        password: '' 
      })
    }
  }

  const clearError = (field: 'username' | 'password') => {
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => clearError('username')}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => clearError('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => clearError('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full">Finish</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
            Return to Login
          </Button>
        </div>
        {successMessage && (
          <p className="text-green-500 text-sm mt-4 text-center">{successMessage}</p>
        )}
      </div>
    </div>
  )
}

