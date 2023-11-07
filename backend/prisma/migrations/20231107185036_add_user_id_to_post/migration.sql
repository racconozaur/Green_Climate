/*
  Warnings:

  - Added the required column `user_id` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "user" (username, password, is_admin)
VALUES ('admin', '$2a$10$1ak9ss3VYSliVFW.Vpcx7.6ShgfiEMMhaVUPC2hdGPyyJmDh4GXYq', true);