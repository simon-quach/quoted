"use client";

import Image from "next/image";
import Link from "next/link";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { useEffect, useState } from "react";

import DefaultProfile from "@/assets/default-profile.svg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const storage = getStorage();
        const storageRef = ref(storage, `images/${currentUser.uid}`);
        getDownloadURL(storageRef)
          .then((url) => {
            // The image URL is available here.
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Error getting image URL: ", error);
          });
      } else {
        setUser(null);
        setImageUrl(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className="h-[64px] flex justify-between items-center p-[2rem] border-b-[1px] border-[#E6E6E6] bg-[#ffffff]">
      <Link href="/">
        <div className="text-[20px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
          quoted.
        </div>
      </Link>
      {user && (
        <Link href="/account">
          {imageUrl ? (
            <div className="rounded-full overflow-hidden">
              <img src={imageUrl} alt="user-profile" className="w-[32px]" />
            </div>
          ) : (
            <Image src={DefaultProfile} alt="default-profile" width={32} />
          )}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
