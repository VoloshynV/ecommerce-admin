import { PrismaClient } from "@prisma/client";

import { env } from "./env/server.mjs";

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
