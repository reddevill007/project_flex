"use client";

import GithubSVG from "@/components/svg/GithubSVG";
import GoogleSVG from "@/components/svg/GoogleSVG";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="w-screen mx-auto flex items-center justify-center h-screen fixed top-0 left-0 bg-white">
      {status === "loading" ? (
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#000"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      ) : (
        <div className="flex items-center justify-center flex-col gap-10">
          <div
            onClick={() => signIn("google")}
            className="border rounded px-4 py-2 cursor-pointer flex gap-3 items-center justify-center"
          >
            <GoogleSVG />
            Sigin with Google
          </div>
          <div className="border rounded px-4 py-2 cursor-pointer flex gap-3 items-center justify-center">
            <GithubSVG />
            Sigin with Github
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
