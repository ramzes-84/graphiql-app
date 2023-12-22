"use client";

import { ReactNode, useEffect, useState } from "react";
import { LangContext, Languages, Server, ServerContext } from "./contexts";
import Loading from "../loading";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);
  const [endpoint, setEndpoint] = useState<string>(Server.Countries);
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
        <ServerContext.Provider value={{ endpoint, setEndpoint }}>
          <LangContext.Provider value={{ lang, setLang }}>
            {children}
          </LangContext.Provider>
        </ServerContext.Provider>
      )}
    </>
  );
};
