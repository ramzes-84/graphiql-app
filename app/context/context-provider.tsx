"use client";

import { ReactNode, useState } from "react";
import { LangContext, Languages } from "./contexts";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
