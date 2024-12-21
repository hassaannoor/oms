'use client'

import { useState, useEffect } from 'react'
import { Client, Department, Member, Project } from '@/types'
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

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const htmlFormData = new FormData(e.currentTarget);
    const newProject = {
      name: htmlFormData.get('name'),
      status: htmlFormData.get('status'),
      budget: parseFloat(htmlFormData.get('budget') as string),
      paymentMade: htmlFormData.get('paymentMade') === 'true',
      description: htmlFormData.get('description'),
      managerId: htmlFormData.get('managerId'),
    }
    // setFormData(newProject);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })
      if (res.ok) {
        setIsCreateOpen(false)
        setFormData({ name: '', status: 'PLANNING', budget: 0, paymentMade: false, description: '', managerId: '', clientId: '', departmentId: '' })
        fetchProjects()
      }
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentProject) return

    try {
      const res = await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsEditOpen(false)
        setCurrentProject(null)
        fetchProjects()
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

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

  const ProjectForm = ({ onSubmit, isEdit = false, departments, members, clients }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, isEdit?: boolean, departments: Department[], members: Member[], clients: Client[] }) => {
    const [formData, setFormData] = useState({
      name: '',
      status: 'PLANNING',
      budget: 0,
      paymentMade: false,
      description: '',
      managerId: '',
      clientId: '',
      departmentId: ''
    });

    // const handleDepartmentChange = (value: string) => {
    //   setFormData(prev => ({ ...prev, departmentId: value }));
    // };

    // const handleManagerChange = (value: string) => {
    //   setFormData(prev => ({ ...prev, managerId: value }));
    // };

    // const handleClientChange = (value: string) => {
    //   setFormData(prev => ({ ...prev, clientId: value }));
    // };

    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={formData.name}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            defaultValue={formData.description}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            defaultValue={formData.status}
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
            defaultValue={formData.budget}
            required
          />
        </div>
        <ManagerSelect members={members}  />
        <ClientSelect clients={clients}  />
        <DepartmentSelect departments={departments} 
        // onChange={handleDepartmentChange} 
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="paymentMade"
            name="paymentMade"
            defaultChecked={formData.paymentMade}
          />
          <Label htmlFor="paymentMade">Payment Made</Label>
        </div>
        <Button type="submit">{isEdit ? 'Update' : 'Create'} Project</Button>
      </form>
    );
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
            <ProjectForm onSubmit={handleCreate} departments={departments} members={members} clients={clients} />
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
          <ProjectForm onSubmit={handleEdit} isEdit={isEditOpen} departments={departments} members={members} clients={[]} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

