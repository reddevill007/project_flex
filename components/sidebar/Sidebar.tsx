"use client";

import {
  FolderKanban,
  FolderSearch,
  Home,
  LogIn,
  LogOut,
  PencilLine,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { status, data } = useSession();

  return (
    <div className="w-[250px] bg-[#f0ecee] border-r border-[#dad3cf] h-screen fixed top-0 left-0 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center border-b mb-4 p-3">
          <Image src="/logo.png" height={70} width={70} alt="Logo" />
          <h1>ProjecrFlex</h1>
        </div>
        <div>
          <Link href="/" className="border-b mb-4 p-3 flex gap-3 items-centers">
            <Home />
            <span>Home</span>
          </Link>
          <Link
            href="/posts"
            className="border-b mb-4 p-3 flex gap-3 items-centers"
          >
            <FolderKanban />
            <span>Projects</span>
          </Link>
          <Link
            href="/write"
            className="border-b mb-4 p-3 flex gap-3 items-centers"
          >
            <PencilLine />
            <span>Write</span>
          </Link>
          <Link
            href="/search"
            className="border-b mb-4 p-3 flex gap-3 items-centers"
          >
            <FolderSearch />
            <span>Search</span>
          </Link>
          <Link
            href="/profile"
            className="border-b mb-4 p-3 flex gap-3 items-centers"
          >
            <User />
            <span>Profile</span>
          </Link>
        </div>
      </div>

      {status === "unauthenticated" ? (
        <Link
          href="/login"
          className="border-b mb-4 p-3 flex gap-3 items-centers"
        >
          <LogIn />
          <span>Login</span>
        </Link>
      ) : (
        <button
          className="border-b mb-4 p-3 flex gap-3 items-centers"
          onClick={() => signOut()}
        >
          <LogOut />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
