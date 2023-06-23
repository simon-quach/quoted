import Image from "next/image";
import Link from "next/link";

import PlusIcon from "@/assets/plus.svg";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[16px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
        EXPLORE
      </div>
      <div className="text-[32px] font-bold">Community Gallery</div>
      <div className="text-[16px] text-[#656565] font-medium w-[80%]">
        Browse through a collection of quotes uploaded by other users
      </div>

      <button className="bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] text-white py-[16px] px-[24px] w-[60%] rounded-[16px] fixed bottom-[24px] left-[50%] translate-x-[-50%] flex justify-center items-center">
        <Image
          src={PlusIcon}
          alt="plus-icon"
          className="absolute left-[24px]"
        />
        <Link href="/create">
          <div className="text-[16px] font-bold">Upload New Quote</div>
        </Link>
      </button>
    </main>
  );
}
