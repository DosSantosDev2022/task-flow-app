/*
  Warnings:

  - The `status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('A_FAZER', 'EM_ANDAMENTO', 'CONCLUIDO');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'A_FAZER';
