"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import FilterBadge from "./filter-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteRoomAction } from "@/actions/room-actions";
import FormError from "@/app/(auth)/_components/form-error";

type UserRoomCardProps = {
  room: Room;
};

const UserRoomCard = ({ room }: UserRoomCardProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const languageTags = room.language.split(",").map((lang) => lang.trim());

  const handleDelete = async (roomId: number) => {
    try {
      const response = await deleteRoomAction(roomId);

      if (response?.error) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage("Error in deleting room. Please try again!");
    }
  };
  return (
    <Card className="flex flex-col gap-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {room.name}
          <Button
            variant="outline"
            className="bg-blue-400 rounded-full hover:bg-blue-500"
            size="icon"
            asChild
          >
            <Link href={`/edit-room/${room.id}`}>
              <PencilIcon className="size-4 text-white" />
            </Link>
          </Button>
        </CardTitle>
        <CardDescription className="flex flex-wrap line-clamp-2">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <>
          <FilterBadge languageTags={languageTags} />
          {room.githubLink && (
            <Link
              href={room.githubLink}
              className="flex items-center gap-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="size-5" /> Github Link
            </Link>
          )}
        </>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <FormError message={errorMessage} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2Icon className="size-4 mr-2" />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this room?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and remove your data from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => await handleDelete(room.id)}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserRoomCard;
