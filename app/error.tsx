"use client";
import Link from "next/link";
import Image from "next/image";
import { USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = useDict();

  return (
    <div className="flex flex-col items-center mx-auto my-4 p-6 rounded-xl">
      <Image src="/error.svg" alt="error" width={300} height={400} priority />
      <h2>{dict.appBroken}</h2>
      <p>
        {dict.errDesc}
        {error.message}
      </p>
      <p>
        {dict.youCan}
        <button className={USUAL_BTN} onClick={() => reset()}>
          {dict.again}
        </button>
        {dict.orGoTo}
        <Link href="/">
          <button className={USUAL_BTN}>{dict.welcomePage}</button>
        </Link>
      </p>
    </div>
  );
}
