"use client";

import { createClient } from "@/utils/supabase/client";

export const githubSignIn = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return { error: "Sign in failed" };
  }

  return { data: "Sign in successful" };
};

export const googleSignIn = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return { error: "Sign in failed" };
  }

  return { data: "Sign in successful" };
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return { error: "Sign out failed" };
  }

  location.reload();
  return { data: "Sign out successful" };
};