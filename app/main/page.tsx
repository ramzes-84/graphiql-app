"use client";

import { useDict } from "../utils/useDictHook";

function Page() {
  const dict = useDict();

  return <div>{dict.mainPage}</div>;
}

export default Page;
