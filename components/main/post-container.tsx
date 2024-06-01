import React, { Suspense } from "react";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import Post from "./post";
import PostLoading from "../post-loading";

type PostType = {
  author_id: string;
  channel: string;
  created_at: string;
  link: string;
  post_id: number;
  title: string;
  upvoted?: string[] | null;
};

const PostContainer = async ({
  query,
  author_id,
  className,
}: {
  query?: string | string[];
  author_id?: string;
  className?: string;
}) => {
  const supabase = createClient();

  const fetchData = async () => {
    let posts: PostType[] = [];
    let error = null;

    try {
      if (author_id) {
        const { data, error: fetchError } = await supabase
          .from("post")
          .select("*")
          .eq("author_id", author_id)
          .order("created_at", { ascending: false });
        if (fetchError) throw fetchError;
        posts = data || [];
      } else if (query === "all") {
        const { data, error: fetchError } = await supabase
          .from("post")
          .select("*")
          .order("created_at", { ascending: false });
        if (fetchError) throw fetchError;
        posts = data || [];
      } else if (query === "hot") {
        const { data, error: fetchError } = await supabase
          .from("post")
          .select("*")
          .order("upvoted", { ascending: true });
        if (fetchError) throw fetchError;
        posts = data || [];
      } else if (query === "old") {
        const { data, error: fetchError } = await supabase
          .from("post")
          .select("*")
          .order("created_at", { ascending: true });
        if (fetchError) throw fetchError;
        posts = data || [];
      } else {
        const { data, error: fetchError } = await supabase
          .from("post")
          .select("*")
          .like("channel", `%${query}%` as string)
          .order("created_at", { ascending: false });
        if (fetchError) throw fetchError;
        posts = data || [];
      }
    } catch (fetchError) {
      console.error("Error fetching posts:", fetchError);
      error = fetchError;
    }

    return { posts, error };
  };

  const { posts, error } = await fetchData();

  return (
    <div className={cn("flex flex-col gap-y-3 w-full h-full", className)}>
      <Suspense fallback={<PostLoading />}>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={index}
              id={post.post_id}
              title={post.title}
              link={post.link}
              author_id={post.author_id}
              created_at={post.created_at}
              upvoted={post.upvoted || []}
              channel={post.channel}
            />
          ))
        ) : (
          <p className="flex items-center justify-center h-full w-full font-mono text-lg md:text-xl text-muted-foreground animate-pulse">
            There is no post to show.
          </p>
        )}
      </Suspense>
    </div>
  );
};

export default PostContainer;
