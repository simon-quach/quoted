import "@/app/globals.css";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "quoted.",
  description: "Quote generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-[#1e1e1e] flex justify-center bg-[#1e1e1e]`}
      >
        <div className="max-w-[500px]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
