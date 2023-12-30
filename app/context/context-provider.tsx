"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  HelpContext,
  LangContext,
  Languages,
  Server,
  ServerContext,
} from "./contexts";
import Loading from "../loading";
import { FullSchema } from "../utils/request";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);
  const [endpoint, setEndpoint] = useState<string>(Server.Countries);
  const [loading, setLoading] = useState(true);
  const [fullSchema, setFullSchema] = useState<FullSchema | null>(null);
  const [tooltipsList, setTooltipsList] = useState<(Element | ReactNode)[]>([]);
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
        <HelpContext.Provider value={{ tooltipsList, setTooltipsList }}>
          <ServerContext.Provider
            value={{ endpoint, setEndpoint, fullSchema, setFullSchema }}
          >
            <LangContext.Provider value={{ lang, setLang }}>
              {children}
            </LangContext.Provider>
          </ServerContext.Provider>
        </HelpContext.Provider>
      )}
    </>
  );
};
