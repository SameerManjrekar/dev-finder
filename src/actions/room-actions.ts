"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import {
  createRoom,
  deleteRoom,
  editRoom,
  getRoomById,
  getRoomByUserId,
} from "@/lib/data/room";
import { roomSchema } from "@/lib/validationSchema/roomSchema";
import { Room } from "@/db/schema";

export async function createRoomAction(values: z.infer<typeof roomSchema>) {
  const validationSchema = roomSchema.safeParse(values);

  if (!validationSchema.success) {
    return { error: "Invalid create room schema" };
  }

  const session = await auth();

  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: "Unauthorized. Please login to create a room" };
  }

  try {
    await createRoom(validationSchema.data, userId);

    revalidatePath("/");

    return { success: "Room created successfully!" };
  } catch (error) {
    return { error: "Error in creating Room" };
  }
}

export async function deleteRoomAction(roomId: number) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized!" };
  }

  //   check if the user has access to the room
  const room = await getRoomById(roomId);

  if (room?.userId !== session.user.id) {
    return { error: "You do not have access to delete this room!" };
  }
  try {
    await deleteRoom(roomId);

    revalidatePath("/your-rooms");
  } catch (error) {
    return { error: "Error in deleting room!" };
  }
}

export async function editRoomAction(roomData: Room) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: "Unauthorized" };
  }

  // check userId to have access to edit this room
  const room = await getRoomByUserId(userId);

  if (room?.userId !== userId) {
    return { error: "You do not have access to edit this room" };
  }
  try {
    await editRoom(roomData);
    revalidatePath("/your-rooms");
  } catch (error) {
    return { error: "Error in editing room!" };
  }
}
