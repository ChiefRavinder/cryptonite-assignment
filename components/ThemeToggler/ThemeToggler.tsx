"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex justify-center">
      {currentTheme === "dark" ? (
        <button
          className="bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
          onClick={() => setTheme("light")}
        >
          {" "}
          <MdDarkMode />
          {/* <Image src="/sun.svg" alt="logo" height="50px" width="50px" /> */}
        </button>
      ) : (
        <button
          className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
          onClick={() => setTheme("dark")}
        >
          <FaSun />
          {/* <Image src="/moon.svg" alt="logo" height="50px" width="50px" /> */}
        </button>
      )}
    </div>
  );
}
