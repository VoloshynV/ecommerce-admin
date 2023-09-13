import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: z.string(),
  STRIPE_API_KEY: z.string(),
  FRONTEND_URL: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const ENV = envSchema.parse(process.env);
