import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    CLERK_SECRET_KEY: z.string(),
    STRIPE_API_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
});
