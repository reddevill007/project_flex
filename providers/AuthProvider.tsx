"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
