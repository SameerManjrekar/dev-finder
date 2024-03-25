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
import { FaGithub } from "react-icons/fa";
import FilterBadge from "./filter-badge";

type RoomCardProps = {
  room: Room;
};

const RoomCard = ({ room }: RoomCardProps) => {
  const languageTags = room.language.split(",").map((lang) => lang.trim());
  return (
    <Card className="flex flex-col gap-3">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
