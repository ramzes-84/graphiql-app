"use client";
import Link from "next/link";
import Image from "next/image";
import { USUAL_BTN } from "./styles/uni-classes";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center mx-auto my-4 p-6 rounded-xl">
      <Image src="/error.svg" alt="error" width={300} height={400} priority />
      <h2>It looks like the app is broken...</h2>
      <p>Error description: {error.message}</p>
      <p>
        You can
        <button className={USUAL_BTN} onClick={() => reset()}>
          Try again
        </button>
        or go to
        <Link href="/">
          <button className={USUAL_BTN}>Main Page</button>
        </Link>
      </p>
    </div>
  );
}
