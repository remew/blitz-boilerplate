# Migration `20201211155531-initial-migration`

This migration has been generated at 12/11/2020, 3:55:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT E'user',

    PRIMARY KEY ("id")
)

CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "userId" TEXT,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

ALTER TABLE "Session" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201211155531-initial-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,38 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgres"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// --------------------------------------
+
+model User {
+  id             String    @default(uuid()) @id
+  createdAt      DateTime  @default(now())
+  updatedAt      DateTime  @updatedAt
+  name           String?
+  email          String    @unique
+  hashedPassword String?
+  role           String    @default("user")
+  sessions       Session[]
+}
+
+model Session {
+  id                 String    @default(uuid()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  expiresAt          DateTime?
+  handle             String    @unique
+  user               User?     @relation(fields: [userId], references: [id])
+  userId             String?
+  hashedSessionToken String?
+  antiCSRFToken      String?
+  publicData         String?
+  privateData        String?
+}
```
