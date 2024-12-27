import { Client, Member, Department, Branch } from "@/types";
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
  selectedDepartmentId: string;
  onChange?: (value: string) => void;
}

interface BranchSelectProps {
  branches: Branch[];
  selectedBranchId: string;
  onChange?: (value: string) => void;
}

export function BranchSelect({ branches, selectedBranchId, onChange }: BranchSelectProps) {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value); // Call onChange if provided
    }
  };

  return (
    <div>
      <Label htmlFor="branchId">Branch</Label>
      <Select name="branchId" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select branch (optional)" />
        </SelectTrigger>
        <SelectContent>
          {branches.map(branch => (
            <SelectItem key={branch.id} value={branch.id} selected={branch.id === selectedBranchId}>
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface BranchHeadSelectProps {
  branchHeads: Member[];
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

export function DepartmentHeadSelect({ departmentHeads, onChange }: DepartmentHeadSelectProps) {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value); // Call onChange if provided
    }
  };

  return (
    <div>
      <Label htmlFor="departmentHeadId">Department Head</Label>
      <Select name="departmentHeadId" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select department head (optional)" />
        </SelectTrigger>
        <SelectContent>
          {departmentHeads.map(head => (
            <SelectItem key={head.id} value={head.id}>
              {head.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function BranchHeadSelect({ branchHeads, onChange }: BranchHeadSelectProps) {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value); // Call onChange if provided
    }
  };

  return (
    <div>
      <Label htmlFor="branchHeadId">Branch Head</Label>
      <Select name="branchHeadId" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select branch head (optional)" />
        </SelectTrigger>
        <SelectContent>
          {branchHeads.map(head => (
            <SelectItem key={head.id} value={head.id}>
              {head.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
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

export function DepartmentSelect({ departments, selectedDepartmentId, onChange }: DepartmentSelectProps) {
  return (
    <div>
      <Label htmlFor="departmentId">Department</Label>
      <Select name="departmentId" value={selectedDepartmentId} onValueChange={onChange}>
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

