"use client";
import { useState } from "react";
import Editor from "../components/editor/editor";
import Viewer from "../components/viewer/viewer";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { IRequest } from "../utils/request";

const Page = () => {
  const dict = useDict();

  const [response, setResponse] = useState<IRequest>({});
  const getResponse = (response: IRequest) => {
    setResponse(response);
  };
  return (
    <>
      <div className={H1}>{dict.mainPage}</div>
      <div className="flex m-3 p-3 gap-5 h-screen bg-fuchsia-50 rounded">
        <Editor callback={getResponse} />
        <Viewer response={response} />
      </div>
    </>
  );
};

export default Page;
Page.requireAuth = true;
