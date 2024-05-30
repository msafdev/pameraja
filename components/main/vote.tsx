"use client";

import React from "react";

import { User } from "@supabase/supabase-js";
import { downvotePost, upvotePost } from "@/lib/actions";

import { ChevronUp } from "lucide-react";
import { useToast } from "../ui/use-toast";

const Vote = ({
  user,
  post_id,
  upvoted,
}: {
  user: User | null;
  post_id: number;
  upvoted: string[];
}) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "You need to login to upvote posts!",
      });
      return;
    }
    if (user && upvoted.includes(user.id)) {
      const response = await downvotePost({
        id: post_id,
        user_id: user.id,
        upvoted: upvoted,
      });
    } else {
      const response = await upvotePost({
        id: post_id,
        user_id: user.id,
        upvoted: upvoted,
      });
    }
  };

  return (
    <form className="cursor-pointer flex items-center" onSubmit={handleSubmit}>
      <button type="submit" className="">
        <ChevronUp
          size={20}
          className={`hover:text-sky-600 anim ${
            user && upvoted.includes(user.id)
              ? "text-sky-500"
              : "text-muted-foreground"
          }`}
        />
      </button>
    </form>
  );
};

export default Vote;
