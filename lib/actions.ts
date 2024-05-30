"use server";

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
