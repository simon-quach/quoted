"use client";

import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { getQuote, updateQuote, deleteQuote } from "@/firebase_helpers";

import Image from "next/image";

import Trash from "@/assets/trash.svg";

const Edit = ({ params }) => {
  const router = useRouter();

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await getQuote(params.id);
      setQuote(quoteData.quote);
      setAuthor(quoteData.author);
    };

    fetchQuote();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateQuote(params.id, quote, author);
    router.push("/");
  };

  const handleTrash = async () => {
    await deleteQuote(params.id);
    router.push("/");
  };

  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[16px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
        EDIT
      </div>
      <div className="text-[32px] font-bold">Edit Your Quote</div>
      <div className="text-[16px] text-[#656565] font-medium w-[80%]">
        Enter your favorite quote and publish it to the community
      </div>

      <div className="mt-[32px]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          action="POST"
          className="flex flex-col"
        >
          <label htmlFor="quote" className="text-[16px] font-bold">
            Quote
          </label>
          <textarea
            name="quote"
            id="quote"
            cols="30"
            rows="10"
            placeholder="Type in quote here"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
          ></textarea>

          <label htmlFor="author" className="text-[16px] font-bold mt-[32px]">
            Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
          ></input>
          <div className="w-full flex  mt-[32px]">
            <button className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white text-[16px] font-bold py-[16px] px-[24px] w-full rounded-[16px] flex justify-center items-center">
              Confirm Edits
            </button>
            <div
              onClick={() => handleTrash()}
              className="mx-[16px] cursor-pointer"
            >
              <Image src={Trash} alt="trash" width={64} />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;
