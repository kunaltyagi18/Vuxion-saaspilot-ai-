import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-24">
      <SignUp />
    </div>
  );
}
