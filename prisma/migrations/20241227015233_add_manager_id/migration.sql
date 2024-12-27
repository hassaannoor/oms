-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "hireDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberType" TEXT NOT NULL,
    "managerId" TEXT NOT NULL DEFAULT 'cm4oa33z70000ul6o88sr6j9m',
    CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Member" ("cnic", "email", "hireDate", "id", "managerId", "memberType", "name", "phoneNo", "salary", "userId") SELECT "cnic", "email", "hireDate", "id", coalesce("managerId", 'cm4oa33z70000ul6o88sr6j9m') AS "managerId", "memberType", "name", "phoneNo", "salary", "userId" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
CREATE UNIQUE INDEX "Member_cnic_key" ON "Member"("cnic");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
