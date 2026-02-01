/*
  Warnings:

  - You are about to drop the column `department` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `pageAccess` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Made the column `regNo` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'SMS', 'WHATSAPP', 'PUSH_WEB', 'PUSH_APP', 'IN_APP');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SCHEDULED', 'SENT', 'DELIVERED', 'READ', 'FAILED', 'CANCELED');

-- DropIndex
DROP INDEX "Teacher_department_idx";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "regNo" SET NOT NULL,
ALTER COLUMN "semester" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "department",
ADD COLUMN     "branches" "Branch"[] DEFAULT ARRAY[]::"Branch"[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pageAccess",
DROP COLUMN "passwordHash",
ADD COLUMN     "allow" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "allowExtra" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "deny" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notification_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "recipient" TEXT NOT NULL,
    "batchId" TEXT,
    "channel" "NotificationChannel" NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "priority" TEXT DEFAULT 'normal',
    "title" TEXT,
    "content" TEXT,
    "metadata" JSONB,
    "provider" TEXT,
    "providerId" TEXT,
    "error" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),

    CONSTRAINT "notification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notification_logs_recipient_idx" ON "notification_logs"("recipient");

-- CreateIndex
CREATE INDEX "notification_logs_batchId_idx" ON "notification_logs"("batchId");

-- CreateIndex
CREATE INDEX "notification_logs_status_idx" ON "notification_logs"("status");

-- CreateIndex
CREATE INDEX "notification_logs_scheduledAt_idx" ON "notification_logs"("scheduledAt");

-- CreateIndex
CREATE INDEX "Teacher_branches_idx" ON "Teacher"("branches");
