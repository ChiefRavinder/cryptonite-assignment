import React from "react";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import { CiSearch } from "react-icons/ci";
import Logo from "@/public/logo-cryptonite.svg";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="mx-6 flex  items-center backdrop-blur z-10 sticky top-0">
      <Image src={Logo} width={20} height={20} alt="logo-cryptonite" />
      <h1 className="ml-1">Cryptonite</h1>
      <div className="flex items-center justify-center w-full  ">
        <div className="relative  bg-white h-12 rounded-full p-2 flex items-center cursor-pointer transition-all duration-700 shadow-[4px_4px_6px_rgba(255,255,255,.3),-4px_-4px_6px_rgba(116,125,136,.2),inset_-4px_-4px_6px_rgba(255,255,255,.2),inset_4px_4px_6px_rgba(0,0,0,.2)] hover:animate-pulse">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="bg-transparent border-none outline-none w-0 text-base font-medium transition-all duration-700 focus:w-96"
          />
          <CiSearch />
        </div>
      </div>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default Navbar;
