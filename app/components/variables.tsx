"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ServerRequestContext } from "../context/contexts";

const Codemirror = dynamic(() => import("./editor/Codemirror"), { ssr: false });

export const Variables = () => {
  const { variables, setVariables } = useContext(ServerRequestContext);
  const [text, setText] = useState(variables);

  useEffect(() => {
    setText(variables);
  }, [variables]);

  const handleChange = useCallback((newText: string) => {
    setText(newText);
    setVariables(newText);
  }, []);

  return (
    <div className=" w-full flex h-full" title="variables">
      <Codemirror value={text} onChange={handleChange} />
    </div>
  );
};
