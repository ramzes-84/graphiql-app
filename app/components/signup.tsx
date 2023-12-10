"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { signIn } from "next-auth/react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dict = useDict();
  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    await signIn("credentials", { email, password, callbackUrl: "/main" });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col gap-5 justify-center px-6 py-12 lg:px-8 w-1/4">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          {dict.register}
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                {dict.emailField}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0  py-1.5  shadow-sm  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  {dict.passwordField}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!email || !password}
                onClick={() => signup()}
                className={USUAL_BTN}
              >
                {dict.register}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
