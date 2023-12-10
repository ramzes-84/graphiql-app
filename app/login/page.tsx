"use client";

import { signIn, useSession } from "next-auth/react";
import { USUAL_BTN } from "../styles/uni-classes";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";

function Page() {
  const { status } = useSession();
  const dict = useDict();
  if (status === "authenticated") redirect("/main");
  return (
    <>
      <button
        className={USUAL_BTN}
        onClick={() => {
          signIn("google", { callbackUrl: "/main" });
        }}
      >
        {dict.login}
      </button>
    </>
  );
}

export default Page;
