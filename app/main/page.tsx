"use client";

import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Page() {
  const dict = useDict();
  const { data: session, status } = useSession();

  if (status !== "authenticated") redirect("/");
  return (
    <>
      <div>{dict.mainPage}</div>
      <div>{session?.user?.name}</div>
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
}

export default Page;
