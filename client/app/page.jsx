"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

import PlusIcon from "@/assets/plus.svg";

import QuoteContainer from "@/components/QuoteContainer";

const Home = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <main className="min-h-[calc(100vh-65px)] pt-[48px] pb-[192px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[16px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
        EXPLORE
      </div>
      <div className="text-[32px] font-bold">Community Gallery</div>
      <div className="text-[16px] text-[#656565] font-medium w-[80%]">
        Browse through a collection of quotes uploaded by other users
      </div>

      <div className="mt-[32px]">
        <QuoteContainer />
      </div>

      {user ? (
        <button
          onClick={() => router.push("/create")}
          className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white py-[16px] px-[24px] rounded-[16px] w-[450px] fixed bottom-[24px] left-[50%] translate-x-[-50%] flex justify-center items-center"
        >
          <Image
            src={PlusIcon}
            alt="plus-icon"
            className="absolute left-[24px]"
          />
          <div className="text-[16px] font-bold">Upload New Quote</div>
        </button>
      ) : (
        <button
          onClick={() => router.push("/log-in")}
          className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white py-[16px] px-[24px] w-[450px] rounded-[16px] fixed bottom-[24px] left-[50%] translate-x-[-50%] flex justify-center items-center"
        >
          <div className="text-[16px] font-bold">Sign In To Upload Quotes</div>
        </button>
      )}
    </main>
  );
};

export default Home;
