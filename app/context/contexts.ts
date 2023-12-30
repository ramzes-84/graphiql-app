import { createContext } from "react";

export enum Server {
  Countries = "https://countries.trevorblades.com/graphql",
  Rick = "https://rickandmortyapi.com/graphql",
  Custom = "",
}

export enum Languages {
  En = "en",
  Ru = "ru",
}

export type LangContext = {
  lang: Languages;
  setLang: React.Dispatch<React.SetStateAction<Languages>>;
};

export const LangContext = createContext<LangContext>({
  lang: Languages.En,
  setLang() {},
});

export type ServerRequestContext = {
  endpoint: string;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  variables: string;
  setVariables: React.Dispatch<React.SetStateAction<string>>;
};

export const ServerRequestContext = createContext<ServerRequestContext>({
  endpoint: Server.Countries,
  setEndpoint() {},
  query: "",
  setQuery() {},
  variables: "",
  setVariables() {},
});
