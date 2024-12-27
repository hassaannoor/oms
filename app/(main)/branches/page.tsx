// app/branches/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { Branch } from '@/types'; // Adjust the import based on your types
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    country: '',
    city: '',
    headId: '', // Assuming you have a headId field
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const res = await fetch('/api/branches');
    const data = await res.json();
    setBranches(data);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = currentBranch ? 'PUT' : 'POST';
    const url = currentBranch ? `/api/branches/${currentBranch.id}` : '/api/branches';

    const newBranch = {
      name: formData.name,
      phoneNo: formData.phoneNo,
      country: formData.country,
      city: formData.city,
      headId: formData.headId,
    };

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBranch),
    });

    if (res.ok) {
      setIsDialogOpen(false);
      setCurrentBranch(null);
      fetchBranches();
    }
  };

  const handleEdit = (branch: Branch) => {
    setCurrentBranch(branch);
    setFormData({
      name: branch.name,
      phoneNo: branch.phoneNo,
      country: branch.country,
      city: branch.city,
      headId: branch.headId,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      await fetch(`/api/branches/${id}`, {
        method: 'DELETE',
      });
      fetchBranches();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Branches</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Branch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentBranch ? 'Edit' : 'Add'} Branch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div>
                <Label htmlFor="name">Branch Name</Label>
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
                  required
                  value={formData.phoneNo}
                  onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="headId">Head ID</Label>
                <Input
                  id="headId"
                  name="headId"
                  required
                  value={formData.headId}
                  onChange={(e) => setFormData({ ...formData, headId: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{currentBranch ? 'Update' : 'Create'} Branch</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map(branch => (
          <div key={branch.id} className="border p-4 rounded">
            <h2 className="font-bold">{branch.name}</h2>
            <p>Phone: {branch.phoneNo}</p>
            <p>Country: {branch.country}</p>
            <p>City: {branch.city}</p>
            <p>Head: <Link href={"/members/" + branch.headId}>{branch.head.name}</Link></p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => handleEdit(branch)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(branch.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}