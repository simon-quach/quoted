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
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      const quoteList = await getAllQuotes();
      setQuotes(quoteList);
    };

    fetchQuotes();
  }, []);

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
          {user && (
            <div>
              {imageUrl ? (
                <div className="rounded-full overflow-hidden absolute right-[24px] top-[24px]">
                  <img src={imageUrl} alt="user-profile" className="w-[32px]" />
                </div>
              ) : (
                <Image src={DefaultProfile} alt="default-profile" width={32} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuoteContainer;
