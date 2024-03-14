-- CreateTable
CREATE TABLE "Refresh_session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" UUID NOT NULL,
    "userAgent" VARCHAR(200) NOT NULL,
    "ip" VARCHAR(15) NOT NULL,
    "expiresIn" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refresh_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refresh_session" ADD CONSTRAINT "Refresh_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
