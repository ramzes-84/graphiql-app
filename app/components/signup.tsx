"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { USUAL_BTN } from "../styles/uni-classes";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    // await signIn('credentials', {email, password, callbackUrl: '/login'})
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-1/4">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Sign up
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 "
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 "
            >
              Password
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
              className="block w-full rounded-md border-0  py-1.5  sm:text-sm sm:leading-6"
            />
          </div>

          <button
            disabled={!email || !password}
            onClick={() => signup()}
            className={USUAL_BTN}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
