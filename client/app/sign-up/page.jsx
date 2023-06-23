import SignUpForm from "@/components/SignUpForm";

import Link from "next/link";

const SignUp = () => {
  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[32px] font-bold">Sign Up</div>

      <div className="mt-[32px]">
        <SignUpForm />
      </div>

      <div className="text-[16px] text-[#656565] font-medium w-[80%] mt-[24px]">
        Already have an account?{" "}
        <span className="underline font-bold">
          <Link href="/log-in">Log in here</Link>
        </span>
      </div>
    </main>
  );
};

export default SignUp;
