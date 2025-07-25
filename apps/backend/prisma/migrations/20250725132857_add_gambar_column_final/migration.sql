/*
  Warnings:

  - Added the required column `gambar` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "VehicleStatus" ADD VALUE 'MAINTENANCE';

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "gambar" TEXT NOT NULL;
