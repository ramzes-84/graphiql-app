"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dict = useDict();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col gap-5 justify-center px-6 py-12 lg:px-8 w-1/4">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          {dict.loginTitle}
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
                onClick={() =>
                  signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/main",
                  })
                }
                disabled={!email || !password}
                className={USUAL_BTN}
              >
                {dict.login}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
