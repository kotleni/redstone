-- CreateTable
CREATE TABLE "public"."Instance" (
    "id" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "coreName" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);
