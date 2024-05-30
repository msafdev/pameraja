import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createClient, createAdminClient } from "@/utils/supabase/server";

const Profile = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  };

  return (
    <div className="flex gap-x-3 items-center group cursor-pointer">
      {user && user.user && (
        <>
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={user.user.user_metadata.avatar_url}
              alt={user.user.user_metadata.preferred_username}
            />
            <AvatarFallback className="text-xs">
              {user.user.user_metadata.name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="hidden md:block text-foreground font-mono text-lg group-hover:underline underline-offset-2">
            {user.user.user_metadata.preferred_username}
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
