'use client'

import { useEffect, useState } from 'react';
import { Client } from '@/types'; // Adjust the import based on your types
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    signDate: '',
    netWorth: 0,
    phoneNo: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await fetch('/api/clients');
    const data = await res.json();
    setClients(data);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = currentClient ? 'PUT' : 'POST';
    const url = currentClient ? `/api/clients/${currentClient.id}` : '/api/clients';

    const htmlFormData = new FormData(e.currentTarget);
    const newClient = {
        name: htmlFormData.get('name'),
        signDate: new Date(htmlFormData.get('signDate') as string).toISOString(),
        netWorth: parseFloat(htmlFormData.get('netWorth') as string),
        phoneNo: htmlFormData.get('phoneNo'),
        email: htmlFormData.get('email'),
        address: htmlFormData.get('address'),
    }

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (res.ok) {
      setIsDialogOpen(false);
      setCurrentClient(null);
      fetchClients();
    }
  };

  const handleEdit = (client: Client) => {
    setCurrentClient(client);
    setFormData({
      name: client.name,
      signDate: new Date(client.signDate).toISOString().split('T')[0],
      netWorth: client.netWorth,
      phoneNo: client.phoneNo,
      email: client.email,
      address: client.address,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });
      fetchClients();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentClient ? 'Edit' : 'Add'} Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="signDate">Sign Date</Label>
                <Input
                  id="signDate"
                  name="signDate"
                  type="date"
                  required
                  value={formData.signDate}
                  onChange={(e) => setFormData({ ...formData, signDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="netWorth">Net Worth</Label>
                <Input
                  id="netWorth"
                  name="netWorth"
                  type="number"
                  required
                  value={formData.netWorth}
                  onChange={(e) => setFormData({ ...formData, netWorth: parseFloat(e.target.value) })}
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{currentClient ? 'Update' : 'Create'} Client</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => (
          <div key={client.id} className="border p-4 rounded">
            <h2 className="font-bold">{client.name}</h2>
            <p>Sign Date: {new Date(client.signDate).toLocaleDateString()}</p>
            <p>Net Worth: ${client.netWorth.toLocaleString()}</p>
            <p>Phone: {client.phoneNo}</p>
            <p>Email: {client.email}</p>
            <p>Address: {client.address}</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => handleEdit(client)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(client.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 