"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Codemirror = dynamic(() => import("./editor/Codemirror"), { ssr: false });

export const Variables = ({
  callback,
}: {
  callback: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(text);
  }, [text]);

  const handleChange = useCallback((newText: string) => {
    setText(newText);
    callback(newText);
  }, []);

  return (
    <div className=" w-full flex h-full">
      <Codemirror value={text} onChange={handleChange} />
    </div>
  );
};
