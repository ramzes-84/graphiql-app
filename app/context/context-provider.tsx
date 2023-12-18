"use client";

import { ReactNode, useEffect, useState } from "react";
import { LangContext, Languages } from "./contexts";
import Loading from "../loading";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedLang =
      !!localStorage.getItem("language") &&
      (localStorage.getItem("language") === "en" ? Languages.En : Languages.Ru);
    savedLang && setLang(savedLang);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LangContext.Provider value={{ lang, setLang }}>
          {children}
        </LangContext.Provider>
      )}
    </>
  );
};
