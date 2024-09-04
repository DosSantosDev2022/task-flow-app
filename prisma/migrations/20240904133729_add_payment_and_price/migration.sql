/*
  Warnings:

  - Added the required column `price` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('CREDITO', 'DEBITO', 'DINHEIRO', 'PIX');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "payment" "Payment" NOT NULL DEFAULT 'DEBITO',
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
