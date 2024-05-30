import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronUp } from "lucide-react";
import { createAdminClient } from "@/utils/supabase/server";
import Vote from "./vote";
import Link from "next/link";

const Post = async ({
  id,
  title,
  link,
  created_at,
  upvoted,
  author_id,
  channel,
}: {
  id: number;
  title: string;
  link: string;
  created_at: string;
  upvoted: string[];
  author_id: string;
  channel: string;
}) => {
  const formatUpvotes = (upvotes: number) => {
    if (upvotes >= 100) {
      return `${(upvotes / 1000).toFixed(1)}k`;
    }
    return upvotes;
  };

  const formatTimeDifference = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    if (diffInSeconds < secondsInHour) {
      return "0 hour ago by";
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago by`;
    } else if (diffInSeconds < secondsInMonth) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} day${days !== 1 ? "s" : ""} ago by`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} month${months !== 1 ? "s" : ""} ago by`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} year${years !== 1 ? "s" : ""} ago by`;
    }
  };

  const supabase = createAdminClient();
  // Get author data
  const { data: author, error: authorError } =
    await supabase.auth.admin.getUserById(author_id);

  // Get user session
  const { data: user, error: userError } = await supabase.auth.getUser();

  return (
    <div className="flex w-full gap-x-4 items-center justify-between group">
      <div className="flex items-center gap-x-3 flex-wrap gap-y-1">
        <Link target="_blank" href={link} aria-label={`Go to ${title}`}>
          <h4 className="text-base md:text-lg font-medium line-clamp-1 anim">
            {title}
          </h4>
        </Link>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-muted-foreground font-mono text-xs lg:text-sm line-clamp-1">
            /{channel} - {formatTimeDifference(new Date(created_at))}
          </p>
          {author && author.user && (
            <div className="flex items-center gap-x-2">
              <Avatar className="w-4 h-4">
                <AvatarImage
                  src={author.user.user_metadata.avatar_url}
                  alt={author.user.user_metadata.preferred_username}
                />
                <AvatarFallback className="text-xs">
                  {author.user.user_metadata.name[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-foreground font-mono text-xs lg:text-sm hover:underline underline-offset-2 cursor-pointer">
                @{author.user.user_metadata.preferred_username}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <p className="font-mono text-muted-foreground">
          {formatUpvotes(upvoted.length)}
        </p>
        <Vote post_id={id} user={user.user} upvoted={upvoted} />
      </div>
    </div>
  );
};

export default Post;
