"use client";

import { createRoomAction, editRoomAction } from "@/actions/room-actions";
import FormError from "@/app/(auth)/_components/form-error";
import FormSuccess from "@/app/(auth)/_components/form-success";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Room } from "@/db/schema";
import { roomSchema } from "@/lib/validationSchema/roomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateRoomFormProps = {
  room?: Room;
};

const CreateRoomForm = ({ room }: CreateRoomFormProps) => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: room?.name || "",
      description: room?.description || "",
      language: room?.language || "",
      githubLink: room?.githubLink || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof roomSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      // create room
      if (!room) {
        const response = await createRoomAction(values);

        if (response.success) {
          form.reset();
          setSuccessMessage(response.success);
          toast.success("Room Created Successfully!");
          router.push("/");
        }

        if (response.error) {
          setErrorMessage(response.error);
        }
      } else {
        // update room

        // to convert values to Room Data type
        const roomData = {
          ...values,
          id: room.id,
          userId: room.userId,
          githubLink: room.githubLink,
        };
        const response = await editRoomAction(roomData);

        if (response?.error) {
          setErrorMessage(response.error);
        }

        if (!response?.error) {
          toast.success("Room Updated Successfully!");
          router.push("/your-rooms");
        }
      }
    } catch (error) {
      toast.success("Something went wrong. Please try again!");
      setErrorMessage("Something went wrong. Please try again!");
    }
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="space-y-5 mt-20" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="space-y-3 w-[500px] sm:w-[600px] shadow-md">
          <CardHeader>
            <h3 className="text-3xl font-semibold text-center">
              {!room ? "Create Room" : "Edit Room"}
            </h3>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        "Sameer's Developer Finder for collaboration"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description about the room"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="node js, react js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubLink"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/SameerManjrekar/sameer-portfolio-ai"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <FormSuccess message={successMessage} />
            <FormError message={errorMessage} />
            <Button disabled={isPending} className="w-full" type="submit">
              {!room ? "Create Room" : "Edit Room"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
