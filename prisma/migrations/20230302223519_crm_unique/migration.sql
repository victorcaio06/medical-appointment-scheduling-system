/*
  Warnings:

  - A unique constraint covering the columns `[crm]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctors_crm_key" ON "doctors"("crm");
