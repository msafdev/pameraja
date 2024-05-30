import { Database } from "@/utils/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
