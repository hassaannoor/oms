'use client'

import { useState, useEffect } from 'react'
import { Member } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ManagerSelect } from '@/components/form-selects'

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentMember, setCurrentMember] = useState<Member | null>(null)

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newMember = {
      name: formData.get('name'),
      email: formData.get('email'),
      phoneNo: formData.get('phoneNo'),
      cnic: formData.get('cnic'),
      salary: parseFloat(formData.get('salary') as string),
      memberType: formData.get('memberType'),
      password: formData.get('password'),
      managerId: formData.get('managerId') || undefined,
    }

    const res = await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify(newMember),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      const created = await res.json()
      setMembers([...members, created])
      setIsEditing(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentMember) return

    const formData = new FormData(e.currentTarget)
    const updatedMember = {
      ...currentMember,
      name: formData.get('name'),
      email: formData.get('email'),
      phoneNo: formData.get('phoneNo'),
      cnic: formData.get('cnic'),
      salary: parseFloat(formData.get('salary') as string),
      memberType: formData.get('memberType'),
      password: formData.get('password'),
      managerId: formData.get('managerId') || undefined,
    }

    const res = await fetch(`/api/members/${currentMember.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMember),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      const updated = await res.json()
      setMembers(members.map(m => m.id === updated.id ? updated : m))
      setIsEditing(false)
      setCurrentMember(null)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/members/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Members</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button>Add Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentMember ? 'Edit' : 'Add'} Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={currentMember ? handleUpdate : handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required defaultValue={currentMember?.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required defaultValue={currentMember?.email} />
              </div>
              <div>
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input id="phoneNo" name="phoneNo" required defaultValue={currentMember?.phoneNo} />
              </div>
              <div>
                <Label htmlFor="cnic">CNIC</Label>
                <Input id="cnic" name="cnic" required defaultValue={currentMember?.cnic} />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input 
                  id="salary" 
                  name="salary" 
                  type="number" 
                  step="0.01" 
                  required 
                  defaultValue={currentMember?.salary} 
                />
              </div>
              <div>
                <Label htmlFor="memberType">Position</Label>
                <Select name="memberType" defaultValue={currentMember?.memberType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="DEPT_HEAD">Department Head</SelectItem>
                    <SelectItem value="BRANCH_HEAD">Branch Head</SelectItem>
                    <SelectItem value="CEO">CEO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!currentMember && (
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="text" required />
                </div>
              )}
              <ManagerSelect members={members}/>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentMember ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map(member => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {member.email}</p>
              <p>Phone: {member.phoneNo}</p>
              <p>Position: <span className={`rounded px-1 ${member.memberType === 'CEO' ? 'bg-red-200' : member.memberType === 'DEPT_HEAD' ? 'bg-blue-200' : member.memberType === 'BRANCH_HEAD' ? 'bg-green-200' : member.memberType === 'MANAGER' ? 'bg-yellow-200' : 'bg-purple-200'}`}>{member.memberType}</span></p>
              <p>Salary: ${member.salary.toLocaleString()}</p>
              <p>CNIC: {member.cnic}</p>
              <p>Hire Date: {new Date(member.hireDate).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentMember(member)
                    setIsEditing(true)
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

