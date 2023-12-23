"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiComb } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useDict } from "@/app/utils/useDictHook";
import dynamic from "next/dynamic";
import { formatCode } from "@/app/utils/formateCode";
import { IResponse, sendRequest } from "@/app/utils/request";
import { ServerContext } from "@/app/context/contexts";

const Codemirror = dynamic(() => import("./Codemirror"), { ssr: false });

type EditorProps = {
  callback: (response: IResponse) => void;
};

const Editor = ({ callback }: EditorProps) => {
  const { endpoint } = useContext(ServerContext);
  const dict = useDict();
  const [text, setText] = useState(dict.defaultTextEditor);

  useEffect(() => {
    setText(dict.defaultTextEditor);
  }, [dict.defaultTextEditor]);

  const handleChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleCorrectBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event && text) {
      const correctQuery = formatCode(text);
      setText(correctQuery);
    }
  };

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const response = await sendRequest(text, endpoint);
      callback(response);
    }
  };

  return (
    <>
      <Codemirror value={text} onChange={handleChange} />
      <div className="flex flex-col">
        <div className="w-10 h-10">
          <button
            type="button"
            className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
            onClick={handleRequest}
            title="Execute query"
          >
            <BsPlayCircle
              style={{ color: "#f6009c", width: "100%", height: "100%" }}
            />
          </button>
        </div>
        <div className="w-10 h-10">
          <button
            type="button"
            className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
            onClick={handleCorrectBtn}
            title="Prettify query"
          >
            <GiComb
              style={{ color: "#f6009c", width: "100%", height: "100%" }}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
