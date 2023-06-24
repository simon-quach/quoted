"use client";

import DefaultProfile from "@/assets/default-profile.svg";

import { auth } from "@/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";

import Image from "next/image";
import { useRouter } from "next/navigation"; // Fixed import here

import { useState, useEffect } from "react";

const page = () => {
  const router = useRouter();

  const [signOut, loading, error] = useSignOut(auth);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const storage = getStorage();
        const storageRef = ref(storage, `images/${user.uid}`);
        getDownloadURL(storageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Error getting image URL: ", error);
          });
      }
    });
  }, [auth]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle the upload progress
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // Update the user profile with this URL
          updateProfile(user, {
            photoURL: downloadURL,
          })
            .then(() => {
              setImageUrl(downloadURL);
              console.log("Updated profile picture");
            })
            .catch((error) => {
              console.error("Error updating profile picture: ", error);
            });
        });
      }
    );
  };

  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[16px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
        ACCOUNT
      </div>
      <div className="text-[32px] font-bold">Your Information</div>
      <div className="mt-[32px] flex items-center">
        {imageUrl ? (
          <div className="rounded-full overflow-hidden">
            <img src={imageUrl} alt="user-profile" width={96} />
          </div>
        ) : (
          <Image src={DefaultProfile} alt="default-profile" width={96} />
        )}

        <div className="ml-[24px]">
          <div className="text-[24px] font-semibold">{user?.email}</div>
          <div className="mt-[4px]">
            <input type="file" onChange={handleChange} />

            <div
              onClick={handleUpload}
              className="font-bold underline text-[16px] text-[#656565] cursor-pointer"
            >
              Change profile picture
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white text-[16px] font-bold py-[16px] px-[24px] w-auto rounded-[16px] flex justify-center items-center mt-[72px]"
        onClick={async () => {
          const success = await signOut();
          if (success) {
            alert("You are signed out");
            router.push("/");
          }
        }}
      >
        Sign Out
      </button>
    </main>
  );
};

export default page;
