"use client";

import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  return (
    <Provider refetchInterval={5} refetchOnWindowFocus={true}>
      {children}
    </Provider>
  );
};
