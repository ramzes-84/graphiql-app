"use client";
import { useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import Viewer from "../components/viewer/viewer";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { IResponse } from "../utils/request";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ServerChooser } from "../components/server-chooser";

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
  return (
    <>
      <div className="text-[#f6009c] flex justify-end mt-2 mr-2">
        {sessionData?.user.token_expiry &&
          `Access open until: ${new Date(sessionData?.user.token_expiry)
            .toLocaleTimeString()
            .slice(0, -3)}`}
      </div>
      <div className={H1}>{dict.mainPage}</div>
      <ServerChooser />

      <div className="grid m-3 p-3 w-full gap-5 min-h-screen bg-fuchsia-50 rounded md:grid-cols-2  grid-flow-col">
        <Editor callback={(resp) => setResponse(resp)} />

        <Viewer response={response} />
      </div>
    </>
  );
};

export default Page;
