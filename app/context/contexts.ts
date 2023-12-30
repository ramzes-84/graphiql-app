import { ReactNode, createContext } from "react";
import { FullSchema } from "../utils/request";

export enum Server {
  Countries = "https://countries.trevorblades.com/graphql",
  Rick = "https://rickandmortyapi.com/graphql",
  Swapi = "https://swapi-graphql.netlify.app/.netlify/functions/index",
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

export type ServerContext = {
  endpoint: string;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
  fullSchema: FullSchema | null;
  setFullSchema: React.Dispatch<React.SetStateAction<FullSchema | null>>;
};

export const ServerContext = createContext<ServerContext>({
  endpoint: Server.Swapi,
  setEndpoint() {},
  fullSchema: {
    types: [],
    queryType: null,
    mutationType: null,
    subscriptionType: null,
  },
  setFullSchema() {},
});

export type HelpContext = {
  tooltipsList: (Element | ReactNode)[];
  setTooltipsList: React.Dispatch<
    React.SetStateAction<(Element | ReactNode)[]>
  >;
};

export const HelpContext = createContext<HelpContext>({
  tooltipsList: [],
  setTooltipsList() {},
});
