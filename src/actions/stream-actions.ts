"use server";

import { StreamChat } from "stream-chat";
import { auth } from "@/lib/auth/auth";

export async function generateTokenAction() {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_STREAM_API_SECRET;

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  if (!apiKey || !apiSecret) {
    return { error: "No API Key and API Secret found!" };
  }

  try {
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    const token = serverClient.createToken(userId);
    return token;
  } catch (error) {
    return { error: "Error in generating token for stream" };
  }
}
