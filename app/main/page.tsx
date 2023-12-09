"use client";

import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Page() {
  const dict = useDict();
  const session = useSession();
  if (!session?.data?.user?.name) redirect("/");
  return (
    <>
      <div>{dict.mainPage}</div>
      <div>{session?.data?.user?.name}</div>
      <button
        className={USUAL_BTN}
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Page;
