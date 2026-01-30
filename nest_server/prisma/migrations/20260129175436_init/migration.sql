-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('pending', 'active', 'rejected', 'blocked', 'unverified');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('student', 'employee');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'ECE', 'EE', 'ME', 'CE', 'CSE_AI', 'CSE_DS', 'EEE', 'AS');

-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('PROFESSOR', 'ASSISTANT_PROFESSOR', 'GUEST', 'LAB_ASSISTANT');

-- CreateEnum
CREATE TYPE "LoginMethod" AS ENUM ('PASS_EMAIL', 'PASS_USERNAME', 'PASS_MOBILE', 'OTP_SMS', 'OTP_WHATSAPP', 'OTP_EMAIL', 'GOOGLE_EMAIL', 'GOOGLE_SUB');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "googleSub" TEXT,
    "mobile" TEXT,
    "profilePicUrl" TEXT,
    "username" TEXT,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "UserStatus" NOT NULL DEFAULT 'pending',
    "personType" "PersonType" NOT NULL,
    "gender" "Gender",
    "dob" TIMESTAMP(3),
    "address" JSONB,
    "emergencyContact" JSONB,
    "socialLinks" JSONB,
    "pageAccess" JSONB,
    "notifications" JSONB,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "rejectedBy" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL,
    "regNo" TEXT,
    "rollNo" TEXT,
    "branch" "Branch" NOT NULL,
    "semester" INTEGER NOT NULL,
    "admissionYear" INTEGER NOT NULL,
    "passingYear" INTEGER,
    "isLateralEntry" BOOLEAN NOT NULL DEFAULT false,
    "guardian" JSONB,
    "hostel" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "userId" TEXT NOT NULL,
    "employeeId" TEXT,
    "officialEmail" TEXT,
    "designation" "Designation",
    "department" "Branch",
    "roomNo" TEXT,
    "office" JSONB,
    "joiningDate" TIMESTAMP(3),
    "experienceYears" INTEGER DEFAULT 0,
    "specialization" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "education" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "loginMethod" "LoginMethod" NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "userAgent" TEXT,
    "device" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "rotatedFromId" TEXT,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "revokedAt" TIMESTAMP(3),
    "revokeReason" TEXT,
    "lastUsedAt" TIMESTAMP(3),

    CONSTRAINT "RefreshSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Student_regNo_key" ON "Student"("regNo");

-- CreateIndex
CREATE INDEX "Student_branch_semester_idx" ON "Student"("branch", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_employeeId_key" ON "Teacher"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_officialEmail_key" ON "Teacher"("officialEmail");

-- CreateIndex
CREATE INDEX "Teacher_department_idx" ON "Teacher"("department");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_isRevoked_idx" ON "RefreshSession"("userId", "isRevoked");

-- CreateIndex
CREATE INDEX "RefreshSession_expiresAt_idx" ON "RefreshSession"("expiresAt");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_loginMethod_idx" ON "RefreshSession"("userId", "loginMethod");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_rotatedFromId_fkey" FOREIGN KEY ("rotatedFromId") REFERENCES "RefreshSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
