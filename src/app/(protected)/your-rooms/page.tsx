import { Button } from "@/components/ui/button";
import { getRoomsByUserId } from "@/lib/data/room";
import Link from "next/link";
import UserRoomCard from "../_components/user-room-card";
import { auth } from "@/lib/auth/auth";
import EmptyLogo from "../../../../public/Empty.png";
import Image from "next/image";

const YourRoomsPage = async () => {
  const session = await auth();

  if (!session) {
    return;
  }
  const userId = session.user?.id;

  if (!userId) {
    return;
  }

  const userRooms = await getRoomsByUserId(userId);
  return (
    <div className="min-h-screen p-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Rooms</h1>
        <Button asChild>
          <Link href="/room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-14">
        {userRooms.map((userRoom) => (
          <UserRoomCard key={userRoom.id} room={userRoom} />
        ))}
      </div>

      {userRooms.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[35vh] space-y-5 mt-20 md:mt-8 ">
          <Image
            src={EmptyLogo}
            width={400}
            height={300}
            alt="empty-data"
            className="rounded-md bg-cover"
          />
          <h2 className="text-2xl font-bold">
            No rooms available at the moment
          </h2>
          <p className="text-gray-800 text-lg text-center max-w-screen-md">
            Please create one using the create room button
          </p>
        </div>
      )}
    </div>
  );
};

export default YourRoomsPage;
