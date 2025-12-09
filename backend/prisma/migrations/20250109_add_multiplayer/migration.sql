-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PlayerSymbol" AS ENUM ('X', 'O');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('waiting', 'playing', 'won', 'draw');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicTac" (
    "id" TEXT NOT NULL,
    "playerXId" TEXT NOT NULL,
    "playerOId" TEXT,
    "board" TEXT NOT NULL DEFAULT '---------',
    "currentTurn" "PlayerSymbol" NOT NULL DEFAULT 'X',
    "status" "GameStatus" NOT NULL DEFAULT 'waiting',
    "winner" "PlayerSymbol",
    "isBotGame" BOOLEAN NOT NULL DEFAULT false,
    "botLevel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicTac_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "TicTac" ADD CONSTRAINT "TicTac_playerXId_fkey" FOREIGN KEY ("playerXId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicTac" ADD CONSTRAINT "TicTac_playerOId_fkey" FOREIGN KEY ("playerOId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
