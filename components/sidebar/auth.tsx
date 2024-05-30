import { Button } from "../ui/button";

import { LogOut, Rocket } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { createClient } from "@/utils/supabase/server";
import { githubSignIn, signOut } from "@/lib/functions";
import Link from "next/link";

const Auth = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center gap-y-2 px-4 mt-auto">
      {user && user.user ? (
        <>
          <Button variant={"outline"} className="w-full" asChild>
            <Link href="/ship">
              <Rocket size={12} className="mr-2" />
              Ship!
            </Link>
          </Button>
          <form action={signOut} className="w-full">
            <Button variant={"outline"} className="w-full">
              <LogOut size={12} className="mr-2" />
              Logout
            </Button>
          </form>
        </>
      ) : (
        <form action={githubSignIn} className="w-full">
          <Button variant={"outline"} className="w-full">
            <FaGithub className="mr-3 w-3 h-3" />
            Login with Github
          </Button>
        </form>
      )}
    </div>
  );
};

export default Auth;
