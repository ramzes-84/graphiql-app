import { createContext } from "react";
import { Server } from "../components/server-chooser";

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
};

export const ServerContext = createContext<ServerContext>({
  endpoint: Server.Countries,
  setEndpoint() {},
});
