"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { channelName } from "@/lib/constant";
import { addPost } from "@/lib/actions";

import { Rocket } from "lucide-react";

export type Post = {
  title: string;
  channel: string;
  link: string;
};

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    channel: "",
    link: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Get form data and await response
    const response = await addPost(newPost);

    // Handle response
    if (response && response.error) {
      toast({
        title: "Something went wrong! Please try again.",
      });
    } else if (response.data) {
      toast({
        title: "Successfully shipped! 🚀",
      });

      // Reset form if successful
      setNewPost({
        title: "",
        channel: "",
        link: "",
      });
    }

    setLoading(false);
  };

  return (
    <form
      className="flex flex-col max-w-md gap-y-5 py-5 px-5 rounded-lg overflow-hidden"
      id="post-form"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-y-1 py-4 border-b bg-background">
        <h2 className="font-mono font-semibold text-lg text-foreground">
          Ship yours now!
        </h2>
        <p className="text-sm text-muted-foreground text-balance">
          We are excited to see what you wanna share. Let the world know about
          it.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative flex flex-col w-full gap-2.5">
          <Label
            htmlFor="title"
            className="absolute px-1 bg-background -top-1.5 left-2 text-xs leading-none"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="This is a title!"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewPost({ ...newPost, title: event.target.value })
            }
            value={newPost.title}
          />
        </div>
        <div className="relative flex flex-col w-full gap-2.5">
          <Label
            htmlFor="channel"
            className="absolute px-1 bg-background -top-1.5 left-2 text-xs leading-none"
          >
            Channel
          </Label>
          <Select
            onValueChange={(value) =>
              setNewPost({ ...newPost, channel: value })
            }
            value={newPost.channel}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select a channel"
                className="placeholder:text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent id="channel">
              {channelName.map((channel, index) => (
                <SelectItem key={index} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex flex-col col-span-2 w-full gap-2.5">
          <Label
            htmlFor="link"
            className="absolute px-1 bg-background -top-1.5 left-2 text-xs leading-none"
          >
            Url
          </Label>
          <Input
            id="link"
            name="link"
            type="link"
            placeholder="https://github.com/msafdev"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewPost({ ...newPost, link: event.target.value })
            }
            value={newPost.link}
          />
        </div>
        <div className="flex items-center justify-end w-full col-span-2 pt-4 border-t">
          <Button className="w-full" variant={"default"} disabled={loading}>
            Ship it!
            <Rocket className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
