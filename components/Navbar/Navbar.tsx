import React from "react";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import { CiSearch } from "react-icons/ci";
import Logo from "@/public/logo-cryptonite.svg";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="mx-6 py-2 flex  items-center backdrop-blur z-10 sticky top-0">
      <Link href="/">
        <div className="flex">
          <Image src={Logo} width={20} height={20} alt="logo-cryptonite" />
          <h1 className="ml-1">Cryptonite</h1>
        </div>
      </Link>

      <div className="flex items-center justify-center w-full  ">
        <div className="relative   px-4 shadow-md  h-12 rounded-full p-1 flex items-center cursor-pointer transition-all duration-700 ">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="dark:text-white bg-transparent outline-none  text-base font-medium "
          />
          <CiSearch className="text-black dark:text-white" />
        </div>
      </div>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default Navbar;
