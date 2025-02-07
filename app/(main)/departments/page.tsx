'use client'

import { useEffect, useState } from 'react';
import { Department, Member, Branch } from '@/types'; // Adjust the import based on your types
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { DepartmentHeadSelect, BranchSelect } from '@/components/form-selects';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth

export default function DepartmentsPage() {
  const { data: session } = useSession(); // Get session data
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentHeads, setDepartmentHeads] = useState<Member[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    headId: '',
    branchId: '',
  });

  useEffect(() => {
    fetchDepartments();
    fetchDepartmentHeads();
    fetchBranches();
  }, []);

  const fetchDepartments = async () => {
    const res = await fetch('/api/departments');
    const data = await res.json();
    if (data.length) 
        setDepartments(data);
  };

  const fetchDepartmentHeads = async () => {
    const res = await fetch('/api/members?memberType=DEPT_HEAD');
    const data = await res.json();
    if (data.length) 
        setDepartmentHeads(data);
  };

  const fetchBranches = async () => {
    const res = await fetch('/api/branches');
    const data = await res.json();
    if (data.length) 
        setBranches(data);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = currentDepartment ? 'PUT' : 'POST';
    const url = currentDepartment ? `/api/departments/${currentDepartment.id}` : '/api/departments';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsDialogOpen(false);
      setCurrentDepartment(null);
      fetchDepartments();
    }
  };

  const handleEdit = (department: Department) => {
    setCurrentDepartment(department);
    setFormData({
      name: department.name,
      phoneNo: department.phoneNo,
      headId: department.headId,
      branchId: department.branchId,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });
      fetchDepartments();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        {(session?.user?.role === 'CEO' || session?.user?.role === 'BRANCH_HEAD') && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Department</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentDepartment ? 'Edit' : 'Add'} Department</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="name">Department Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNo">Phone Number</Label>
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                  />
                </div>
                <div>
                  <DepartmentHeadSelect 
                    departmentHeads={departmentHeads}
                    onChange={(value) => setFormData({ ...formData, headId: value })} 
                  />
                </div>
                <div>
                  <BranchSelect 
                    branches={branches}
                    selectedBranchId={formData.branchId}
                    onChange={(value) => setFormData({ ...formData, branchId: value })} 
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{currentDepartment ? 'Update' : 'Create'} Department</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(department => (
          <div key={department.id} className="border p-4 rounded">
            <h2 className="font-bold">{department.name}</h2>
            <p>Head: {department.head.name}</p>
            <p>Branch: {department.branch.name}</p>
            <p>Phone: {department.phoneNo ?? "(not available)"}</p>
            <p className="text-xl font-bold">Projects</p>
            {department.projects.map((project, i) => (
              <p className="whitespace-nowrap"><span className="font-bold text-sm ">{i + 1}.</span> <Link className="text-sm text-ellipsis" href="/projects">{project.name}</Link></p>
            ))}
            <div className="flex gap-2 mt-4">
              {(session?.user?.role === 'CEO' || session?.user?.role === 'BRANCH_HEAD') && (
                <Button variant="outline" onClick={() => handleEdit(department)}>
                  Edit
                </Button>
              )}
              {session?.user?.role === 'CEO' && (
                <Button variant="destructive" onClick={() => handleDelete(department.id)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}