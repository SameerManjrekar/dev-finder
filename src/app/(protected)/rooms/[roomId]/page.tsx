import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getRoomById } from "@/lib/data/room";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { DevFinderVideo } from "../../_components/video-player";
import { auth } from "@/lib/auth/auth";
import FilterBadge from "../../_components/filter-badge";

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage = async ({ params: { roomId } }: RoomPageProps) => {
  const session = await auth();
  const room = await getRoomById(parseInt(roomId));

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-3xl">
          Unauthenticated. Please log In to continue!
        </h2>
      </div>
    );
  }
  if (!room) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-3xl">No Details found for this room!</h2>
      </div>
    );
  }

  const languageTags = room.language.split(",").map((lang) => lang.trim());
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 h-full">
      <div className="col-span-3 p-4">
        <Card>
          <CardHeader>
            <CardTitle>VIDEO PLAYER</CardTitle>
          </CardHeader>
          <CardContent className="z-50">
            <DevFinderVideo session={session.user} room={room} />
          </CardContent>
        </Card>
      </div>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="flex flex-wrap line-clamp-2">
              {room.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <>
              <div className="flex gap-2 flex-wrap">
                <FilterBadge languageTags={languageTags} />
              </div>
              {room.githubLink && (
                <Link
                  href={room.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-2"
                >
                  <FaGithub className="size-5" />
                  Github Link
                </Link>
              )}
            </>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomPage;
