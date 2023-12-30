"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LangContext,
  Languages,
  Server,
  ServerRequestContext,
} from "./contexts";
import Loading from "../loading";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);
  const [endpoint, setEndpoint] = useState<string>(Server.Countries);
  const [query, setQuery] = useState("");
  const [variables, setVariables] = useState("");
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
        <ServerRequestContext.Provider
          value={{
            endpoint,
            setEndpoint,
            query,
            setQuery,
            variables,
            setVariables,
          }}
        >
          <LangContext.Provider value={{ lang, setLang }}>
            {children}
          </LangContext.Provider>
        </ServerRequestContext.Provider>
      )}
    </>
  );
};
