"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { formatCode } from "../utils/formateCode";

const Codemirror = dynamic(() => import("./editor/Codemirror"), { ssr: false });

export const Variables = ({
  callback,
  format,
}: {
  format: boolean;
  callback: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (format) setText(formatCode(text));
  }, [format]);

  const handleChange = useCallback((newText: string) => {
    setText(newText);
    callback(newText);
  }, []);

  return (
    <div className=" w-full flex h-full" title="variables">
      <Codemirror value={text} onChange={handleChange} />
    </div>
  );
};
