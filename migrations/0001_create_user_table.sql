-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "author_id" INTEGER NOT NULL,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" DATETIME NOT NULL,
    CONSTRAINT "article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
