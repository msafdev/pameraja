import { createClient } from "@/utils/supabase/server";

import Post from "@/components/main/post";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.channel ? searchParams.channel : "all";
  const supabase = createClient();
  let posts = [];
  let error = null;

  if (query === "all") {
    const { data, error: fetchError } = await supabase
      .from("post")
      .select("*")
      .order("created_at", { ascending: false });
    posts = data || [];
    error = fetchError;
  } else if (query === "hot") {
    const { data, error: fetchError } = await supabase
      .from("post")
      .select("*")
      .order("upvoted", { ascending: true });
    posts = data || [];
    error = fetchError;
  } else if (query === "old") {
    const { data, error: fetchError } = await supabase
      .from("post")
      .select("*")
      .order("created_at", { ascending: true });
    posts = data || [];
    error = fetchError;
  } else {
    const { data, error: fetchError } = await supabase
      .from("post")
      .select("*")
      .like("channel", `%${query}%` as string)
      .order("created_at", { ascending: false });
    posts = data || [];
    error = fetchError;
  }

  return (
    <div className="flex flex-col gap-y-4 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      {posts &&
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
        ))}
    </div>
  );
}
