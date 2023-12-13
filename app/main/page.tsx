"use client";

import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const dict = useDict();
  const { data, status } = useSession();
  if (status === "unauthenticated") redirect("/");

  return (
    <>
      <div>{dict.mainPage}</div>

      <div>{data?.user?.email}</div>
      <button
        className={USUAL_BTN}
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        {dict.logout}
      </button>
    </>
  );
};

export default Page;
Page.requireAuth = true;
