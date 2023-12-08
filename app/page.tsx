"use client";
import Link from "next/link";
import { USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";

export default function Home() {
  const dict = useDict();

  return (
    <main className="h-screen">
      <div>{dict.welcomePage}</div>
      <Link href="/main" className={USUAL_BTN}>
        {dict.mainPage}
      </Link>
    </main>
  );
}
