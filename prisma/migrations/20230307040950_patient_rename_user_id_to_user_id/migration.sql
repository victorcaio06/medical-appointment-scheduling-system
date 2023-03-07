/*
  Warnings:

  - You are about to drop the column `userId` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_userId_fkey";

-- DropIndex
DROP INDEX "patients_userId_key";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
