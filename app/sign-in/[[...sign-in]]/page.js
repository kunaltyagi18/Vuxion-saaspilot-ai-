import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-24">
      <SignIn />
    </div>
  );
}
