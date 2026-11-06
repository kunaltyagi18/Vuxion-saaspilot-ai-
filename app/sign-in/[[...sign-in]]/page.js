"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

function getRedirectUrl() {
  if (typeof window === "undefined") return "/";

  const redirectUrl = new URLSearchParams(window.location.search).get("redirect_url");
  return redirectUrl || "/";
}

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const redirectUrl = getRedirectUrl();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.replace(redirectUrl);
    }
  }, [isLoaded, isSignedIn, redirectUrl]);

  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 py-24 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 py-24 dark:bg-gray-900">
      <SignIn forceRedirectUrl={redirectUrl} />
    </div>
  );
}
