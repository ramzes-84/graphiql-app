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
      <div className={H1}>{dict.mainPage}</div>
      <ServerChooser />
      <p>
        {sessionData?.user.token_expiry &&
          `Token expiration time: ${new Date(
            sessionData?.user.token_expiry
          ).toLocaleTimeString()}`}
      </p>
      {/* ^^^  this is just for checking the functionality, should be removed later. The action will not occur exactly that time, since the session update period is 30s  */}
      <div className="flex m-3 p-3 gap-5 h-screen bg-fuchsia-50 rounded">
        <Editor callback={(resp) => setResponse(resp)} />
        <Viewer response={response} />
      </div>
    </>
  );
};

export default Page;
