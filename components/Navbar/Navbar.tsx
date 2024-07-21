"use client";
import React, { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import { CiSearch } from "react-icons/ci";
import Logo from "@/public/logo-cryptonite.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Coin } from "@/type";
import { useRouter } from "next/navigation";
import {
  addPastSearch,
  removePastSearch,
} from "@/features/pastSearches/pastSearchSlice";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.coins.coins) || [];
  const pastSearchList =
    useSelector((state: RootState) => state.pastSearch.pastSearch) || [];

  const filteredCoins = coins.filter(
    (coin: Coin) =>
      coin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handlePastSearchRemove = (coinId: string) => {
    dispatch(removePastSearch({ id: coinId }));
  };

  const handleCoinClick = (coin: Coin) => {
    dispatch(addPastSearch(coin));
    router.push(`/coins?id=${coin.id}`);
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
          <h1 className="ml-1 font-bold hidden md:flex">Cryptonite</h1>
        </div>
      </Link>

      <div className="relative flex items-center justify-center w-full lg:flex">
        <div className="relative px-4 shadow-md h-12 rounded-full p-1 flex items-center cursor-pointer transition-all duration-700">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="dark:text-white bg-transparent outline-none text-base font-medium w-full"
            onFocus={() => setIsDropdownOpen(true)}
          />
          <CiSearch className="text-black dark:text-white" />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded mt-1 z-20"
            >
              {searchQuery ? (
                filteredCoins.length > 0 ? (
                  <ul
                    style={{
                      maxHeight: "15rem",
                      overflow: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {filteredCoins.map((coin) => (
                      <li
                        key={coin.id}
                        className="p-2 border-b border-gray-300 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleCoinClick(coin)}
                      >
                        <div className="flex items-center">
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
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-center text-gray-600 dark:text-gray-400">
                    No coins found
                  </div>
                )
              ) : (
                pastSearchList.length > 0 && (
                  <ul
                    style={{
                      maxHeight: "15rem",
                      overflow: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {pastSearchList.map((coin: Coin) => (
                      <li
                        key={coin.id}
                        className="p-2 border-b border-gray-300 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                      >
                        <div
                          className="flex items-center"
                          onClick={() => handleCoinClick(coin)}
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
                        <button
                          className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() => handlePastSearchRemove(coin.id)}
                        >
                          &#10005; {/* Cross icon */}
                        </button>
                      </li>
                    ))}
                  </ul>
                )
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
