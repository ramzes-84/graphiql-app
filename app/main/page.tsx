"use client";

import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";

function Page() {
  const dict = useDict();

  return <div className={H1}>{dict.mainPage}</div>;
}

export default Page;
