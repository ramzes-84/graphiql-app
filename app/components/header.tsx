"use client";
import { GrGraphQl } from "react-icons/gr";
import { LiaSignOutAltSolid, LiaSignInAltSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  return (
    <header
      className={`${scrollStyle} transition-colors z-50 shadow-[0_6px_9px_0px_rgba(0,0,0,0.25)]`}
      data-testid="header-test"
    >
      <nav
        className="mx-auto flex items-center justify-between px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="w-12 h-12 hover:rotate-90 transition-transform">
          <Link href="/" title="welcome page">
            <GrGraphQl
              style={{ color: "#f6009c", width: "100%", height: "100%" }}
            />
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/main" className="w-10 h-10" title="sign in">
            <LiaSignInAltSolid
              style={{ color: "#f6009c", width: "100%", height: "100%" }}
            />
          </Link>
          <Link href="/" className="w-10 h-10" title="sign out">
            <LiaSignOutAltSolid
              style={{ color: "#f6009c", width: "100%", height: "100%" }}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};
