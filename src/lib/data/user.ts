import { unstable_noStore } from "next/cache";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  try {
    const userByEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return userByEmail;
  } catch (error) {
    throw new Error("Error in fetching user by email");
  }
}

export async function deleteAccount(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));
  } catch (error) {
    throw new Error("Error in deleting User Account");
  }
}
