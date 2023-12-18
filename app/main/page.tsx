"use client";
import { signOut, useSession } from "next-auth/react";
import Editor from "../components/editor/editor";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const { status, data: sessionData } = useSession();
  const tokenExpiry = sessionData?.user.token_expiry;
  useEffect(() => {
    const isTokenExpired =
      tokenExpiry && new Date(tokenExpiry) < new Date(sessionData?.expires);
    if (status === "authenticated" && isTokenExpired) {
      signOut({ callbackUrl: "/", redirect: true });
    }
  }, [sessionData, status, tokenExpiry]);

  const dict = useDict();
  if (status === "unauthenticated") redirect("/");
  return (
    <>
      <div className={H1}>{dict.mainPage}</div>
      <p>{sessionData?.user?.token_expiry}</p>
      <div className="flex m-3 p-3 gap-5 h-screen">
        <Editor />
      </div>
    </>
  );
};

export default Page;
