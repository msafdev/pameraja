import PostContainer from "@/components/main/post-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient, createAdminClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabaseAdmin = createAdminClient();

  const { data: author, error: authorError } =
    await supabaseAdmin.auth.admin.getUserById(params.id);

  if (!author.user) {
    return (
      <div className="flex flex-col items-center justify-center font-mono animate-pulse text-lg md:text-xl h-full w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        User not found
      </div>
    );
  }

  console.log(author.user.identities);

  return (
    <div className="flex flex-col h-full w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 gap-y-5">
      <div className="flex items-center gap-x-3">
        <Avatar className="w-12 h-12 rounded-xl overflow-hidden">
          <AvatarImage
            className="rounded-xl"
            src={author.user.user_metadata.avatar_url}
            alt={author.user.user_metadata.preferred_username}
          />
          <AvatarFallback className="text-xs rounded-xl">
            {author.user.user_metadata.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-base md:text-lg font-semibold">
            {author.user.user_metadata.name}
          </h3>
          <Link
            href={`https://github.com/${author.user.user_metadata.preferred_username}`}
            target="_blank"
            className="font-mono text-muted-foreground text-xs md:text-sm anim hover:underline underline-offset-2"
          >
            @{author.user.user_metadata.preferred_username}
          </Link>
        </div>
      </div>
      <p className="w-full max-w-lg text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum minima iste beatae error tenetur eum non! Delectus, incidunt maxime.</p>
      <div className="flex flex-col gap-y-2">
        <PostContainer author_id={author.user.id}/>
      </div>
    </div>
  );
}
