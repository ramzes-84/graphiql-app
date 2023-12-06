"use client";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    window.scrollY > 5 ? setIsSticky(true) : setIsSticky(false);
  };
  const scrollStyle = isSticky
    ? "bg-purple-200 py-2 fixed top-0 w-full"
    : "bg-header py-5";
  return <header className={`${scrollStyle} transition-colors`}>Header</header>;
};
