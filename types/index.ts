export type MemberType = 'EMPLOYEE' | 'MANAGER' | 'DEPT_HEAD' | 'BRANCH_HEAD' | 'CEO'

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD'

export interface Member {
  id: string
  userId: string
  name: string
  email: string
  phoneNo: string
  cnic: string
  salary: number
  hireDate: Date
  memberType: MemberType
}

export interface Project {
  id: string
  name: string
  description: string
  budget: number
  status: ProjectStatus
  managerId: string
  clientId: string
  departmentId: string
  paymentMade: boolean
}

export interface Department {
  id: string
  name: string
  phoneNo: string
  headId: string
  branchId: string
}

export interface Branch {
  id: string
  name: string
  phoneNo: string
  country: string
  city: string
  headId: string
  companyId: string
}

export interface Company {
  id: string
  name: string
  phoneNo: string
  founder: string
  ceoId: string
}

export interface Client {
  id: string
  name: string
  signDate: Date
  netWorth: number
  phoneNo: string
  email: string
  address: string
}

