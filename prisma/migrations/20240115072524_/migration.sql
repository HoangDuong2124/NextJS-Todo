-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "isStatus" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "isCheck" BOOLEAN,
    "isUpdate" BOOLEAN,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
