"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "Loading";
  }

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="w-[500px] h-[600px] flex items-center justify-center flex-col gap-10">
        <div onClick={() => signIn("google")}>Sigin with Google</div>
        <div>Sigin with Github</div>
      </div>
    </div>
  );
};

export default LoginPage;
