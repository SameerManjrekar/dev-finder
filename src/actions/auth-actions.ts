"use server";

import { registerSchema } from "@/lib/validationSchema/registerSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/data/user";
import { db } from "@/db";
import { users } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { loginSchema } from "@/lib/validationSchema/loginSchema";
import { signIn, signOut } from "@/lib/auth/auth";
import { AuthError } from "next-auth";

export async function register(values: z.infer<typeof registerSchema>) {
  const validationSchema = registerSchema.safeParse(values);

  if (!validationSchema.success) {
    return { error: "Register schema is invalid" };
  }

  const { name, email, password } = validationSchema.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.insert(users).values({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: "User Registered successfully! Please login to continue",
    };
  } catch (error) {
    return { error: "Error in User Registration!" };
  }
}

export async function login(values: z.infer<typeof loginSchema>) {
  const validationSchema = loginSchema.safeParse(values);

  if (!validationSchema.success) {
    return { error: "Invalid Login Schema" };
  }

  const { email, password } = validationSchema.data;
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default: {
          return { error: "Something went wrong. Please try again!" };
        }
      }
    }
    // is needed to avoid the next-auth REDIRECT_URL error
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
