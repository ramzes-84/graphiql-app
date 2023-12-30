"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiComb } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useDict } from "@/app/utils/useDictHook";
import dynamic from "next/dynamic";
import { formatCode } from "@/app/utils/formateCode";
import { IResponse, sendRequest } from "@/app/utils/request";
import { ServerContext } from "@/app/context/contexts";
import { IoIosArrowDropdown } from "react-icons/io";
import { Variables } from "../variables";
import { Headers } from "../headers";

const Codemirror = dynamic(() => import("./Codemirror"), { ssr: false });

type EditorProps = {
  callback: (response: IResponse) => void;
};

const Editor = ({ callback }: EditorProps) => {
  const { endpoint } = useContext(ServerContext);
  const dict = useDict();
  const [text, setText] = useState(dict.defaultTextEditor);
  const [lowerPanel, setLowerPanel] = useState("");
  const [variables, setVariables] = useState("");
  const [format, setFormat] = useState(false);

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
      setFormat(true);
      setTimeout(() => {
        setFormat(false);
      }, 1000);
    }
  };

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const response = await sendRequest(text, endpoint, variables);
      callback(response);
    }
  };

  return (
    <div className="flex gap-2">
      <div className=" w-full flex flex-col justify-between min-h-screen">
        <Codemirror value={text} onChange={handleChange} />
        <div className=" flex justify-between p-3 shadow-md my-1">
          <div className="flex">
            <button
              onClick={() => setLowerPanel("variables")}
              className={
                lowerPanel === "variables"
                  ? "text-[#f6009c]  shadow-slate-900 shadow-sm mx-2 rounded-sm px-2"
                  : " mx-2 text-[#f6009c] shadow-none"
              }
            >
              {dict.variables}
            </button>
            <button
              onClick={() => setLowerPanel("headers")}
              className={
                lowerPanel === "headers"
                  ? "text-[#f6009c]  shadow-slate-900 shadow-sm mx-2 rounded-sm px-2"
                  : " mx-2 text-[#f6009c] shadow-none"
              }
            >
              {dict.headers}
            </button>
          </div>
          <button
            onClick={() =>
              lowerPanel.length > 0
                ? setLowerPanel("")
                : setLowerPanel("variables")
            }
          >
            <IoIosArrowDropdown
              style={
                lowerPanel.length > 0
                  ? {
                      color: "#f6009c",
                      width: "100%",
                      height: "100%",
                      transform: "rotate(0.5turn)",
                    }
                  : { color: "#f6009c", width: "100%", height: "100%" }
              }
            />
          </button>
        </div>
        {lowerPanel.length > 0 && (
          <div className="h-40 shadow-md w-full transition-all">
            {lowerPanel === "variables" ? (
              <Variables
                callback={(text: string) => setVariables(text)}
                format={format}
              />
            ) : (
              <Headers />
            )}
          </div>
        )}
      </div>

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
    </div>
  );
};

export default Editor;
