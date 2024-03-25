import { unstable_noStore } from "next/cache";

import { db } from "@/db";
import { eq, like } from "drizzle-orm";
import { Room, room } from "@/db/schema";
import { z } from "zod";
import { roomSchema } from "../validationSchema/roomSchema";

export async function createRoom(
  roomData: z.infer<typeof roomSchema>,
  userId: string
) {
  unstable_noStore();
  try {
    const { name, description, language, githubLink } = roomData;
    await db.insert(room).values({
      userId,
      name,
      description,
      language,
      githubLink,
    });
  } catch (error) {
    throw new Error("Error in creating rooms");
  }
}

export async function getRooms(search: string | undefined) {
  // to always return latest records
  unstable_noStore();
  try {
    const where = search ? like(room.language, `%${search}%`) : undefined;
    const rooms = await db.query.room.findMany({
      where,
    });

    return rooms;
  } catch (error) {
    throw new Error("Error in fetching rooms");
  }
}

export async function getRoomById(roomId: number) {
  unstable_noStore();
  try {
    const roomById = await db.query.room.findFirst({
      where: eq(room.id, roomId),
    });

    return roomById;
  } catch (error) {
    throw new Error("Error in fetching Room By Id");
  }
}

export async function getRoomsByUserId(userId: string) {
  unstable_noStore();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  try {
    const roomsByUserId = await db.query.room.findMany({
      where: eq(room.userId, userId),
    });

    return roomsByUserId;
  } catch (error) {
    throw new Error("Unable to fetch Rooms By User");
  }
}

export async function getRoomByUserId(userId: string) {
  unstable_noStore();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  try {
    const roomByUserId = await db.query.room.findFirst({
      where: eq(room.userId, userId),
    });

    return roomByUserId;
  } catch (error) {
    throw new Error("Unable to fetch Rooms By User");
  }
}

export async function deleteRoom(roomId: number) {
  try {
    await db.delete(room).where(eq(room.id, roomId));
  } catch (error) {
    throw new Error("Error in deleting room");
  }
}

export async function editRoom(roomData: Room) {
  try {
    await db.update(room).set(roomData).where(eq(room.id, roomData.id));
  } catch (error) {
    throw new Error("Error in editing room");
  }
}
