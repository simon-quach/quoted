import Image from "next/image";
import Link from "next/link";

import ProfileIcon from "@/assets/profile-icon.svg";

const Navbar = () => {
  return (
    <nav className="h-[64px] flex justify-between items-center p-[2rem] border-b-[1px] border-[#E6E6E6]">
      <Link href="/">
        <div className="text-[20px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
          quoted.
        </div>
      </Link>

      <Image src={ProfileIcon} alt="profile-icon" className="w-[24px]" />
    </nav>
  );
};

export default Navbar;
