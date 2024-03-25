import Link from "next/link";

import { Button } from "@/components/ui/button";
import RoomCard from "./(protected)/_components/room-card";
import { getRooms } from "@/lib/data/room";
import SearchBar from "@/components/search-bar";
import EmptyLogo from "../../public/Empty.png";
import Image from "next/image";

type HomeProps = {
  searchParams: {
    search?: string;
  };
};

export default async function Home({ searchParams: { search } }: HomeProps) {
  const rooms = await getRooms(search);

  return (
    <main className="p-10">
      <div className="flex flex-col space-y-4 sm:flex-row items-center justify-between w-full">
        <h1 className="text-3xl font-bold">
          Find Dev Rooms for Collaboration created by Sameer Manjrekar
        </h1>
        <Button asChild>
          <Link href="/room">Create Room</Link>
        </Button>
      </div>

      <div className="mt-8">
        <SearchBar />
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {rooms.length === 0 && (
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
            There are no rooms at this moment. Please Log in to create rooms and
            chat with other developers about topics which you want to learn from
            them{" "}
          </p>
        </div>
      )}
    </main>
  );
}
