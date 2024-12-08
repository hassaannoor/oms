import { Client, Member, Department } from "@/types";
import { Label } from "@/components/ui/label";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface ManagerSelectProps {
    members: Member[],
    onChange?: (value: string) => void;
}
interface ClientSelectProps {
    clients: Client[];
    onChange?: (value: string) => void; 
  }
  
interface DepartmentSelectProps {
  departments: Department[];
  onChange?: (value: string) => void;
}

export function ManagerSelect({members, onChange}: ManagerSelectProps)  {
    const handleChange = (value: string) => {
        if (onChange) {
          onChange(value); // Call onChange if provided
        }
      };
    
      return (
        <div>
          <Label htmlFor="managerId">Manager</Label>
          <Select name="managerId" onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select manager (optional)" />
          </SelectTrigger>
          <SelectContent>
            {members
              .filter(m => m.memberType === "MANAGER")
              .map(manager => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        </div>)
}

export function ClientSelect({ clients, onChange }: ClientSelectProps) {
    const handleChange = (value: string) => {
      if (onChange) {
        onChange(value); // Call onChange if provided
      }
    };
  
    return (
      <div>
        <Label htmlFor="clientId">Client</Label>
        <Select name="clientId" onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Client (optional)" />
          </SelectTrigger>
          <SelectContent>
            {clients
              .map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        </div>)
}

export function DepartmentSelect({ departments, onChange }: DepartmentSelectProps) {
  return (
    <div>
      <Label htmlFor="departmentId">Department</Label>
      <Select name="departmentId" onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map(department => (
            <SelectItem key={department.id} value={department.id}>
              {department.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

