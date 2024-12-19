-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_headId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ceoId_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_headId_fkey";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "phoneNo" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "headId" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "phoneNo" DROP NOT NULL,
ALTER COLUMN "founder" DROP NOT NULL,
ALTER COLUMN "ceoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "phoneNo" DROP NOT NULL,
ALTER COLUMN "headId" DROP NOT NULL,
ALTER COLUMN "branchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
