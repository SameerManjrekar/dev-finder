import { getRoomById } from "@/lib/data/room";
import CreateRoomForm from "../../_components/create-roon-form";

type EditRoomPageProps = {
  params: {
    roomId: string;
  };
};

const EditRoomPage = async ({ params: { roomId } }: EditRoomPageProps) => {
  const room = await getRoomById(parseInt(roomId));

  if (!room) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2>No Room Data available for this room</h2>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-[80%]">
      <CreateRoomForm room={room} />
    </div>
  );
};

export default EditRoomPage;
