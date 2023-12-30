"use client";
import { useContext, useEffect, useState } from "react";
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
import { ServerRequestContext } from "../context/contexts";
import Loader from "../components/loader";

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
  const { endpoint, setQuery, setVariables, variables, query } =
    useContext(ServerRequestContext);
  const [loading, setLoading] = useState(false);
  const handleCorrectBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const correctQuery = formatCode(query);
      setQuery(correctQuery);
      const correctVars = formatCode(variables);
      setVariables(correctVars);
    }
  };

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setLoading(true);
      const res = await sendRequest(query, endpoint, variables);
      setResponse(res);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-[#f6009c] flex justify-end mt-2 mr-2">
        {sessionData?.user.token_expiry &&
          `${dict.tokenValid} ${new Date(sessionData?.user.token_expiry)
            .toLocaleTimeString()
            .slice(0, -3)}`}
      </div>
      <div className={H1}>{dict.mainPage}</div>
      <ServerChooser />

      <div className="flex m-3 p-3 w-full gap-2 min-h-screen bg-fuchsia-50 rounded ">
        <Editor />
        <div className="flex flex-col">
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
          <Viewer response={response} />
        )}
      </div>
    </>
  );
};

export default Page;
