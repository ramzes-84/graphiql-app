"use client";
import Editor from "../components/editor/editor";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";

const Page = () => {
  const dict = useDict();
  return (
    <>
      <div className={H1}>{dict.mainPage}</div>
      <div className="flex m-3 p-3 gap-5 h-screen">
        <Editor />
      </div>
    </>
  );
};

export default Page;
