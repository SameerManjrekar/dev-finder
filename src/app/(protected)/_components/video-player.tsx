"use client";

import { Room } from "@/db/schema";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { DefaultSession } from "next-auth";
import { useEffect, useState } from "react";
import { generateTokenAction } from "@/actions/stream-actions";
import { useRouter } from "next/navigation";

type DevFinderVideoProps = {
  session: DefaultSession["user"];
  room: Room;
};

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

export const DevFinderVideo = ({ session, room }: DevFinderVideoProps) => {
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!session || !room) return;

    const userId = session.id;

    if (!session || !userId) return;

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.name ?? undefined,
        image: session.image ?? undefined,
      },
      tokenProvider: () =>
        generateTokenAction().then((data) => {
          return data.toString();
        }),
    });
    setClient(client);
    const call = client.call("default", room.id.toString());
    call.join({ create: true });
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  if (!client) return <div>No client found!</div>;
  if (!call) return <div>No call found!</div>;

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls onLeave={() => router.push("/")} />
          <CallParticipantsList onClose={() => {}} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};
