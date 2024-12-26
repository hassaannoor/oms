-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "hireDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberType" TEXT NOT NULL,
    "managerId" TEXT,
    CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "paymentMade" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectEmployee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "assignDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectEmployee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT,
    "headId" TEXT,
    "branchId" TEXT,
    CONSTRAINT "Department_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Department_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT,
    "country" TEXT,
    "city" TEXT,
    "headId" TEXT,
    "companyId" TEXT,
    CONSTRAINT "Branch_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT,
    "founder" TEXT,
    "ceoId" TEXT,
    CONSTRAINT "Company_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "signDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "netWorth" REAL NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_cnic_key" ON "Member"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectEmployee_projectId_employeeId_key" ON "ProjectEmployee"("projectId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_headId_key" ON "Department"("headId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_headId_key" ON "Branch"("headId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ceoId_key" ON "Company"("ceoId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
