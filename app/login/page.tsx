"use client";

import { signIn, useSession } from "next-auth/react";
import { USUAL_BTN } from "../styles/uni-classes";
import { redirect } from "next/navigation";

function Page() {
  const session = useSession();
  if (session?.data?.user?.name) redirect("/main");
  return (
    <>
      <button
        className={USUAL_BTN}
        onClick={() => {
          signIn("google");
        }}
      >
        Login
      </button>
    </>
  );
}

export default Page;
