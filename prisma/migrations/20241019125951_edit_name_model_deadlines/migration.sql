/*
  Warnings:

  - You are about to drop the column `prazo` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `prazo` on the `tasks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Deadlines" AS ENUM ('DENTRO_DO_PRAZO', 'FORA_DO_PRAZO');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "prazo",
ADD COLUMN     "deadlines" "Deadlines" NOT NULL DEFAULT 'DENTRO_DO_PRAZO';

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "prazo",
ADD COLUMN     "deadlines" "Deadlines" NOT NULL DEFAULT 'DENTRO_DO_PRAZO';

-- DropEnum
DROP TYPE "Prazo";
