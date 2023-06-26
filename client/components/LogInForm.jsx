"use client";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "next/navigation";

import { useState } from "react";

const LogInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      router.push("/");
    } catch (error) {
      alert("Invalid email or password");
      console.error("Error logging in user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        action="POST"
        className="flex flex-col"
      >
        <label htmlFor="email" className="text-[16px] font-bold">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
        ></input>

        <label htmlFor="password" className="text-[16px] font-bold mt-[32px]">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
        ></input>

        <button className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white text-[16px] font-bold py-[16px] px-[24px] w-auto rounded-[16px] flex justify-center items-center mt-[32px]">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
