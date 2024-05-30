"use server";

import { Post } from "@/app/(app)/ship/form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function upvotePost({
  id,
  user_id,
  upvoted,
}: {
  id: number;
  user_id: string;
  upvoted: string[];
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { error } = await supabase
    .from("post")
    .update([
      {
        upvoted: [...upvoted, user_id],
      },
    ])
    .eq("post_id", id);

  if (error) {
    return { error };
  } else {
    revalidatePath("/");
    return { success: true };
  }
}

export async function downvotePost({
  id,
  user_id,
  upvoted,
}: {
  id: number;
  user_id: string;
  upvoted: string[];
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { error } = await supabase
    .from("post")
    .update([
      {
        upvoted: upvoted.filter((upvoter) => upvoter !== user_id),
      },
    ])
    .eq("post_id", id);

  if (error) {
    return { error };
  } else {
    revalidatePath("/");
    return { success: true };
  }
}

export async function addPost(post: Post) {
  const { title, link, channel } = post;

  console.log(post);

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: user } = await supabase.auth.getUser();
  const user_id = user.user?.id;

  if (!user) {
    return { error: "User not found" };
  }

  if (!title || !link || !channel) {
    return { error: "Missing required fields" };
  }

  const { error } = await supabase.from("post").insert([
    {
      // capitalize first letter of title
      title: title.charAt(0).toUpperCase() + title.slice(1),
      link,
      channel: channel.toLowerCase(),
      author_id: user_id,
      upvoted: [user_id],
    },
  ]);

  if (error) {
    console.error(error);
    return { error: "Error inserting data" };
  } else {
    revalidatePath("/guestbook");
    return { data: "Data inserted successfully" };
  }
}
