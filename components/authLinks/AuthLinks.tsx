import { stat } from "fs";
import Link from "next/link";
import React from "react";

const AuthLinks = () => {
  const status = "notauthenticated";
  return (
    <>
      {status === "notauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <div>
          <Link href="/write">Write</Link>
          <span>Logout</span>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
