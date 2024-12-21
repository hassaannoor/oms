'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { EditEmployeeModal } from '@/components/edit-employee-modal'

interface Employee {
  id: number
  name: string
  experience: string
  phone: string
  email: string
  picture: string
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'John Doe', experience: '5 years', phone: '123-456-7890', email: 'john@example.com', picture: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Jane Smith', experience: '3 years', phone: '098-765-4321', email: 'jane@example.com', picture: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Bob Johnson', experience: '7 years', phone: '555-123-4567', email: 'bob@example.com', picture: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Alice Brown', experience: '2 years', phone: '777-888-9999', email: 'alice@example.com', picture: '/placeholder.svg?height=100&width=100' },
]

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleView = (id: number) => {
    // TODO: Implement view functionality
    console.log('View employee', id)
  }

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-4">
              <img src={employee.picture} alt={employee.name} className="w-24 h-24 mx-auto rounded-full mb-2" />
              <h2 className="text-xl font-bold text-center">{employee.name}</h2>
              <p className="text-center text-gray-600">{employee.experience}</p>
              <p className="text-center">{employee.phone}</p>
              <p className="text-center">{employee.email}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleEdit(employee)}>Edit Details</Button>
              <Button onClick={() => handleView(employee.id)}>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <EditEmployeeModal
        employee={editingEmployee}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEmployee}
      />
    </div>
  )
}

