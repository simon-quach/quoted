"use client";

import { addQuote } from "@/firebase_helpers";

import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuote(e.target.quote.value, e.target.author.value);
    router.push("/");
  };

  return (
    <div>
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
          className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
        ></textarea>

        <label htmlFor="author" className="text-[16px] font-bold mt-[32px]">
          Author
        </label>
        <input
          id="author"
          type="text"
          placeholder="Author"
          className="bg-[#f0f0f0] resize-none rounded-[16px] px-[16px] py-[20px] outline-none focus:border-[2px] focus:border-[#A35BFF] mt-[8px]"
        ></input>

        <button className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white text-[16px] font-bold py-[16px] px-[24px] w-auto rounded-[16px] flex justify-center items-center mt-[32px]">
          Upload Quote
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
