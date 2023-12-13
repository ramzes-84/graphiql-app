"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GiComb } from "react-icons/gi";
import { useDict } from "@/app/utils/useDictHook";
import dynamic from "next/dynamic";
import { formatCode } from "@/app/utils/formateCode";
const Codemirror = dynamic(() => import("./Codemirror"), { ssr: false });

const Editor = () => {
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

  return (
    <>
      <Codemirror value={text} onChange={handleChange} />
      <div className="w-10 h-10">
        <button
          type="button"
          className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
          onClick={handleCorrectBtn}
          title="formate code"
        >
          <GiComb style={{ color: "#f6009c", width: "100%", height: "100%" }} />
        </button>
      </div>
    </>
  );
};

export default Editor;
