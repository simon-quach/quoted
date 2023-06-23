import LogInForm from "@/components/LogInForm";

import Link from "next/link";

const LogIn = () => {
  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[32px] font-bold">Log In</div>

      <div className="mt-[32px]">
        <LogInForm />
      </div>

      <div className="text-[16px] text-[#656565] font-medium w-[80%] mt-[24px]">
        Don't have an account?{" "}
        <span className="underline font-bold">
          <Link href="/sign-up">Sign up here</Link>
        </span>
      </div>
    </main>
  );
};

export default LogIn;
