"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";
import { useState } from "react";
import { Form, IFormInput } from "../components/form";
import { SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Page() {
  const { status } = useSession();
  const dict = useDict();
  if (status === "authenticated") redirect("/main");
  const [isRegistrated, setIsRegistrated] = useState(true);
  const signin: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    const email = data.email;
    const password = data.password;
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/main",
    });
  };
  const signup: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    const email = data.email;
    const password = data.password;
    await createUserWithEmailAndPassword(auth, email, password);
    await signIn("credentials", { email, password, callbackUrl: "/main" });
  };
  return (
    <>
      <div className="flex flex-col items-center">
        {isRegistrated ? (
          <Form name={dict.login} callback={signin} title={dict.loginTitle} />
        ) : (
          <Form
            name={dict.register}
            callback={signup}
            title={dict.signupTitle}
          />
        )}
        <div>{isRegistrated ? dict.notHaveAnAccount : dict.haveAnAccount}</div>
        <button
          className=" font-bold text-blue-500 ml-3"
          onClick={() => setIsRegistrated(!isRegistrated)}
        >
          {isRegistrated ? dict.register : dict.login}
        </button>
      </div>
    </>
  );
}

export default Page;
