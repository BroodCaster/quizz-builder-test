/*
  Warnings:

  - Added the required column `questionType` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('Boolean', 'Input', 'Checkbox');

-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "questionType" "public"."QuestionType" NOT NULL;
