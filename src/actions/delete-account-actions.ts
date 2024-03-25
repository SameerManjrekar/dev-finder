"use server";

import { auth } from "@/lib/auth/auth";
import { deleteAccount } from "@/lib/data/user";
import { redirect } from "next/navigation";

export async function deleteAccountAction() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: "Unauthorized!" };
  }

  try {
    await deleteAccount(userId);

    redirect("/");
  } catch (error) {
    return { error: "Error in Account deletion " };
  }
}
