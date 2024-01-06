"use client";

import {
  FolderKanban,
  FolderSearch,
  Home,
  LogIn,
  LogOut,
  MessagesSquare,
  PencilLine,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeSVG from "../svg/HomeSVG";
import SearchSVG from "../svg/SearchSVG";

const MobileBar = () => {
  return (
    <div className="fixed flex justify-between items-center bg-[#f0ecee] w-full z-10 py-3 bottom-0 left-0 md:hidden">
      <Link href="/" className="border-b mb-4 p-3 flex gap-3 items-centers">
        <HomeSVG />
      </Link>
      <Link
        href="/posts"
        className="border-b mb-4 p-3 flex gap-3 items-centers"
      >
        <FolderKanban />
      </Link>
      <Link
        href="/chatroom"
        className="border-b mb-4 p-3 flex gap-3 items-centers"
      >
        <MessagesSquare />
      </Link>
      <Link
        href="/write"
        className="border-b mb-4 p-3 flex gap-3 items-centers"
      >
        <PencilLine />
      </Link>
      <Link
        href="/search"
        className="border-b mb-4 p-3 flex gap-3 items-centers"
      >
        <SearchSVG />
      </Link>
      <Link
        href="/profile"
        className="border-b mb-4 p-3 flex gap-3 items-centers"
      >
        <User />
      </Link>
      {status === "unauthenticated" ? (
        <Link
          href="/login"
          className="border-b mb-4 p-3 flex gap-3 items-centers"
        >
          <LogIn />
        </Link>
      ) : (
        <button
          className="border-b mb-4 p-3 flex gap-3 items-centers"
          onClick={() => signOut()}
        >
          <LogOut />
        </button>
      )}
    </div>
  );
};

export default MobileBar;
