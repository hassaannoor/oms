'use client'

import { useState, useEffect, useCallback } from 'react'
import { Client, Department, Member, Project, ProjectEmployee } from '@/types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ManagerSelect, DepartmentSelect, ClientSelect } from '@/components/form-selects'
import React from 'react';

const EmployeeSelectDialog = ({ open, onClose, employees, assignedEmployees, handleAssignEmployee }) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(assignedEmployees.map(emp => emp.id));

  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) ? prev.filter(id => id !== employeeId) : [...prev, employeeId]
    );
  };

  const handleSave = () => {
    selectedEmployees.forEach(employeeId => handleAssignEmployee(employeeId));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Employees</DialogTitle>
        </DialogHeader>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => toggleEmployeeSelection(employee.id)}
                />
                {employee.name}
              </label>
            </li>
          ))}
        </ul>
        <Button onClick={handleSave}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

const ProjectForm = React.memo(({ onSubmit, isEdit = false, departments, members, clients, formData, handleInputChange, projectEmployees, handleAssignEmployee, handleRemoveEmployee }) => {
  const [isEmployeeSelectOpen, setIsEmployeeSelectOpen] = useState(false);

  return (
    <form onSubmit={(e) => onSubmit(e, isEdit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) => handleInputChange({ target: { name: 'status', value } })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ON_HOLD">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={(e) => handleInputChange({
            target: { name: 'budget', value: parseFloat(e.target.value) || 0 }
          })}
          required
        />
      </div>
      <ManagerSelect 
        members={members} 
        selectedManagerId={formData.managerId} 
        onChange={(value) => handleInputChange({ target: { name: 'managerId', value } })} 
      />
      <ClientSelect 
        clients={clients} 
        selectedClientId={formData.clientId} 
        onChange={(value) => handleInputChange({ target: { name: 'clientId', value } })} 
      />
      <DepartmentSelect 
        departments={departments} 
        selectedDepartmentId={formData.departmentId} 
        onChange={(value) => handleInputChange({ target: { name: 'departmentId', value } })} 
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="paymentMade"
          name="paymentMade"
          checked={formData.paymentMade}
          onChange={handleInputChange}
        />
        <Label htmlFor="paymentMade">Payment Made</Label>
      </div>

        <div className='mt-4'>
            <h2 className="text-xl font-bold">Assigned Employees</h2>
            <ul>
            {projectEmployees.map(employee => (
                <li key={employee.id}>
                {employee.name} 
                <Button variant="destructive" onClick={() => handleRemoveEmployee(employee.id)}>Remove</Button>
                </li>
            ))}
            </ul>
            <Button onClick={(ev) => {ev.preventDefault(); setIsEmployeeSelectOpen(true)}}>Assign Employee</Button>
        </div>

      <EmployeeSelectDialog 
        open={isEmployeeSelectOpen} 
        onClose={() => setIsEmployeeSelectOpen(false)} 
        employees={members} 
        assignedEmployees={projectEmployees} 
        handleAssignEmployee={handleAssignEmployee} 
      />

      <Button type="submit">{isEdit ? 'Update' : 'Create'} Project</Button>
    </form>
  );
});

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'PLANNING',
    budget: 0,
    paymentMade: false,
    description: '',
    managerId: '',
    clientId: '',
    departmentId: ''
  })

  const [members, setMembers] = useState<Member[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [projectEmployees, setProjectEmployees] = useState<ProjectEmployee[]>([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
    fetchMembers()
    fetchDepartments()
    fetchClients()
  }, []);


  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  const fetchMembers = async () => {
    const res = await fetch('/api/members')
    const data = await res.json()
    setMembers(data)
  }

  const fetchDepartments = async () => {
    const res = await fetch('/api/departments')
    const data = await res.json()
    setDepartments(data)
  }

  const fetchClients = async () => {
    const res = await fetch('/api/clients')
    const data = await res.json()
    setClients(data)
  }

  const fetchProjectEmployees = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/employees`)
    const data = await res.json()
    setProjectEmployees(data)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, isEdit: boolean) => {
    e.preventDefault()
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/projects/${currentProject?.id}` : '/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsCreateOpen(false)
        setIsEditOpen(false)
        setCurrentProject(null)
        setFormData({ name: '', status: 'PLANNING', budget: 0, paymentMade: false, description: '', managerId: '', clientId: '', departmentId: '' })
        fetchProjects()
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} project:`, error)
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleAssignEmployee = async (employeeId: string) => {
    const res = await fetch(`/api/projects/${currentProject?.id}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId }),
    })
    if (res.ok) {
      fetchProjectEmployees(currentProject?.id)
    }
  }

  const handleRemoveEmployee = async (employeeId: string) => {
    const res = await fetch(`/api/projects/${currentProject?.id}/employees/${employeeId}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      fetchProjectEmployees(currentProject?.id)
    }
  }

  const openEditDialog = (project: Project) => {
    setCurrentProject(project)
    setFormData({
      name: project.name,
      status: project.status,
      budget: project.budget,
      paymentMade: project.paymentMade,
      description: project.description,
      managerId: project.managerId,
      clientId: project.clientId,
      departmentId: project.departmentId
    })
    setIsEditOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm 
              onSubmit={handleFormSubmit} 
              departments={departments} 
              members={members} 
              clients={clients} 
              formData={formData} 
              handleInputChange={handleInputChange} 
              projectEmployees={projectEmployees} 
              handleAssignEmployee={handleAssignEmployee} 
              handleRemoveEmployee={handleRemoveEmployee} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{project.description}</p>
              <p>Status: {project.status}</p>
              <p>Budget: ${project.budget.toLocaleString()}</p>
              <p>Payment Made: {project.paymentMade ? 'Yes' : 'No'}</p>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" onClick={() => openEditDialog(project)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            onSubmit={handleFormSubmit} 
            isEdit={isEditOpen} 
            departments={departments} 
            members={members} 
            clients={clients} 
            formData={formData} 
            handleInputChange={handleInputChange} 
            projectEmployees={projectEmployees} 
            handleAssignEmployee={handleAssignEmployee} 
            handleRemoveEmployee={handleRemoveEmployee} 
          />
        </DialogContent>
      </Dialog>

      
    </div>
  )
}

