import { createContext, useContext } from "react";

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

type State = {
  endpoint: string;
  query: string;
  variables?: string;
};

type Action = {
  type: string;
  payload: string;
};

export const InitialState: State = {
  endpoint: Server.Countries,
  query: "",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setEndpoint":
      return { ...state, endpoint: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    case "setVariables":
      return { ...state, variables: action.payload };
    default:
      throw new Error("Wrong action");
  }
};

export const ServerRequestContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: InitialState,
  dispatch: () => null,
});

export const useServerRequestContext = () => {
  return useContext(ServerRequestContext);
};
