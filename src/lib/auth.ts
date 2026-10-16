import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

// Lovable's OAuth broker lives at /~oauth/initiate and only exists when the
// app is served by Lovable hosting. On any other host (e.g. Vercel, see
// vercel.json) that path 404s and "Continue with Google" goes nowhere, so we
// probe for it and otherwise use Supabase's own Google OAuth.
async function lovableBrokerAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/~oauth/initiate", { method: "GET", redirect: "manual" });
    return res.status !== 404;
  } catch {
    return false;
  }
}

export type GoogleSignInResult =
  { status: "redirecting" } | { status: "signed-in" } | { status: "error"; message: string };

export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  const origin = window.location.origin;

  if (await lovableBrokerAvailable()) {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: origin });
    if (result.error) {
      return {
        status: "error",
        message: result.error.message || "Sign-in failed. Please try again.",
      };
    }
    return result.redirected ? { status: "redirecting" } : { status: "signed-in" };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth` },
  });
  if (error) {
    return { status: "error", message: error.message || "Sign-in failed. Please try again." };
  }
  return { status: "redirecting" };
}

// True when the current URL looks like the return leg of an OAuth redirect.
export function isOAuthReturn(): boolean {
  if (typeof window === "undefined") return false;
  const { hash, search } = window.location;
  return (
    hash.includes("access_token=") ||
    new URLSearchParams(search).has("code") ||
    hash.includes("error_description=") ||
    search.includes("error_description=")
  );
}
