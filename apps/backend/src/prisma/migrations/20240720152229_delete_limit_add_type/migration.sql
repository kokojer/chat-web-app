/*
  Warnings:

  - You are about to drop the column `usersLimit` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "usersLimit",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'personal';
