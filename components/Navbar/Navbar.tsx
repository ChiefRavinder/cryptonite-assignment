"use client";
import React, { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import { CiSearch } from "react-icons/ci";
import Logo from "@/public/logo-cryptonite.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Coin } from "@/type"; // Import Coin type
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.coins.coins) || [];

  // Filter coins based on search query
  const filteredCoins = coins.filter(
    (coin: Coin) =>
      coin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true); // Open dropdown when typing
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false); // Close dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleDropdownClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-6 py-2 flex items-center backdrop-blur z-10 sticky top-0">
      <Link href="/">
        <div className="flex">
          <Image src={Logo} width={20} height={20} alt="logo-cryptonite" />
          <h1 className="ml-1">Cryptonite</h1>
        </div>
      </Link>

      <div className="relative flex items-center justify-center w-full  lg:flex">
        <div className="relative px-4 shadow-md h-12 rounded-full p-1 flex items-center cursor-pointer transition-all duration-700">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="dark:text-white bg-transparent outline-none text-base font-medium w-full"
            onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
          />
          <CiSearch className="text-black dark:text-white" />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded mt-1 z-20"
            >
              {filteredCoins.length > 0 ? (
                <ul
                  style={{
                    maxHeight: "15rem" /* equivalent to max-h-60 in Tailwind */,
                    overflow: "auto",
                    scrollbarWidth: "none" /* For Firefox */,
                  }}
                >
                  {filteredCoins.map((coin) => (
                    <Link href={`/coins?id=${coin.id}`}>
                      <li
                        key={coin.id}
                        className="p-2 border-b border-gray-300 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <div
                          className="flex items-center"
                          onClick={() => {
                            // dispatch(addRecentWatchList(coins[startIndex + index]));
                            router.push(`/coins?id=${coin.id}`);
                          }}
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-6 h-6 mr-2"
                          />
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {coin.symbol.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div className="p-2 text-center text-gray-600 dark:text-gray-400">
                  No coins found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default Navbar;
