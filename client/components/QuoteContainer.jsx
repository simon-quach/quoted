import { useState, useEffect } from "react";

import { getAllQuotes } from "@/firebase_helpers";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

import Edit from "@/assets/edit.svg";
import DefaultProfile from "@/assets/default-profile.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase";

const QuoteContainer = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const fetchQuotes = async () => {
      const quoteList = await getAllQuotes();
      setQuotes(quoteList);
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchProfileImages = async () => {
      const images = {};

      for (const quote of quotes) {
        try {
          const url = await getProfileImage(quote.uid);
          images[quote.uid] = url;
        } catch (error) {
          images[quote.uid] = DefaultProfile; // Default image in case of error
        }
      }

      setProfileImages(images);
    };

    fetchProfileImages();
  }, [quotes]);

  const getProfileImage = async (uid) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${uid}`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error getting image URL: ", error);
      return null;
    }
  };

  return (
    <div>
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="bg-[#FFFFFF] rounded-[16px] p-[24px] mt-[24px] drop-shadow-sm"
        >
          <div className="text-[16px] text-[#1e1e1e] font-bold">
            {quote.quote}
          </div>
          <div className="text-[16px] text-[#1e1e1e] font-semibold mt-[8px]">
            - {quote.author}
          </div>
          <div className="text-[16px] text-[#656565] font-medium mt-[8px]">
            {quote.timestamp}
          </div>
          {auth.currentUser && quote.uid === auth.currentUser.uid && (
            <div
              onClick={() => router.push(`/edit/${quote.id}`)}
              className="absolute right-[24px] bottom-[24px] cursor-pointer"
            >
              <Image src={Edit} alt="edit" />
            </div>
          )}
          <div>
            {quote.uid && (
              <div className="rounded-full overflow-hidden absolute right-[24px] top-[24px]">
                <img
                  src={profileImages[quote.uid] || DefaultProfile}
                  alt="user-profile"
                  className="w-[32px]"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteContainer;
