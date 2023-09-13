import { PrismaClient } from "@prisma/client";

import { ENV } from "@/env";

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (ENV.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
