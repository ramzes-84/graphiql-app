"use client";
import { useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import Viewer from "../components/viewer/viewer";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { IResponse, sendRequest } from "../utils/request";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ServerChooser } from "../components/server-chooser";
import { formatCode } from "../utils/formateCode";
import { GiComb } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useServerRequestContext } from "../context/contexts";
import Loader from "../components/loader";
import { HelpSection } from "../components/help-section";

const Page = () => {
  const { status, data: sessionData } = useSession();
  if (status === "unauthenticated") redirect("/");
  const tokenExpiry = sessionData?.user.token_expiry;
  useEffect(() => {
    const isTokenExpired = tokenExpiry && new Date(tokenExpiry) < new Date();
    if (status === "authenticated" && isTokenExpired) {
      signOut({ callbackUrl: "/", redirect: true });
    }
  }, [sessionData, status, tokenExpiry]);

  const dict = useDict();
  const [response, setResponse] = useState<IResponse>({});
  const { state, dispatch } = useServerRequestContext();
  const [loading, setLoading] = useState(false);
  const handleCorrectBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const correctQuery = formatCode(state.query);
      dispatch({ type: "setQuery", payload: correctQuery });
      if (state.variables) {
        const correctVars = formatCode(state.variables);
        dispatch({ type: "setVariables", payload: correctVars });
      }
      if (state.headers) {
        const correctHeaders = formatCode(state.headers);
        dispatch({ type: "setHeaders", payload: correctHeaders });
      }
    }
  };

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setLoading(true);
      const res = await sendRequest(
        state.query,
        state.endpoint,
        state.variables,
        state.headers
      );
      setResponse(res);
      setLoading(false);
    }
  };
  return (
    <main className="p-3">
      <div className="text-[#f6009c] flex justify-end mt-2 mr-2">
        {sessionData?.user.token_expiry &&
          `${dict.tokenValid} ${new Date(sessionData?.user.token_expiry)
            .toLocaleTimeString()
            .slice(0, -3)}`}
      </div>
      <div className={H1}>{dict.mainPage}</div>
      <ServerChooser />
      {state.fullSchema && <HelpSection />}
      <div className="w-full min-h-screen">
        <section
          className="rounded gap-2 p-5 bg-fuchsia-50"
          style={{ display: "grid", gridTemplateColumns: "1fr 50px 1fr" }}
        >
          <div className=" flex flex-col h-screen overflow-auto">
            <Editor />
          </div>

          <div className="flex flex-col w-14 items-center">
            <div className="w-10 h-10">
              <button
                type="button"
                className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
                onClick={handleRequest}
                title="Execute query"
              >
                <BsPlayCircle
                  style={{ color: "#f6009c", width: "100%", height: "100%" }}
                />
              </button>
            </div>
            <div className="w-10 h-10">
              <button
                type="button"
                className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
                onClick={handleCorrectBtn}
                title="Prettify query"
              >
                <GiComb
                  style={{ color: "#f6009c", width: "100%", height: "100%" }}
                />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="w-full h-fit">
              <Loader size={50} />
            </div>
          ) : (
            <div className=" overflow-auto ">
              <Viewer response={response} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
