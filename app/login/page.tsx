"use client";

import { signIn, useSession } from "next-auth/react";
import { USUAL_BTN } from "../styles/uni-classes";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";
import { useState } from "react";
import Signin from "../components/signin";
import Signup from "../components/signup";

function Page() {
  const { status } = useSession();
  const dict = useDict();
  if (status === "authenticated") redirect("/main");
  const [isRegistrated, setIsRegistrated] = useState(true);
  return (
    <>
      <div className="flex flex-col items-center">
        {isRegistrated ? <Signin /> : <Signup />}
        <button
          className={USUAL_BTN}
          onClick={() => {
            signIn("google", { callbackUrl: "/main" });
          }}
        >
          {dict.loginWithGoogle}
        </button>
        <div>{dict.haveAnAccount}</div>
        <button
          className=" font-bold text-blue-500 ml-3"
          onClick={() => setIsRegistrated(false)}
        >
          {dict.register}
        </button>
      </div>
    </>
  );
}

export default Page;
