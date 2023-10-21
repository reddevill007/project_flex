"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthLinks from "../authLinks/AuthLinks";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      <div className="flex w-full justify-end px-10 py-4">
        <div className="flex items-center gap-5 border-b w-fit px-4 pb-2">
          <Link href="/">
            <h1 className="text-3xl hover:text-gray-500 transition-all">
              ProjectFlex
            </h1>
          </Link>
          <span>/</span>
          <ul className="flex justify-end items-center gap-5">
            <li className="hover:text-gray-500 transition-all">
              <Link href="/">Category</Link>
            </li>
            <li>/</li>
            <li className="hover:text-gray-500 transition-all">
              <Link href="/">Category</Link>
            </li>
            <li>/</li>
            {status === "authenticated" && (
              <>
                <li className="hover:text-gray-500 transition-all">
                  <Link href="/write">Write</Link>
                </li>
                <li>/</li>
              </>
            )}
            <li className="hover:text-gray-500 transition-all">
              {status === "unauthenticated" ? (
                <Link href="/login">Login</Link>
              ) : (
                <Link onClick={() => signOut()} href="/">
                  Logout
                </Link>
              )}
            </li>
            <li>/</li>
          </ul>
          <button onClick={() => setIsOpen(!isOpen)} className="text-4xl">
            +
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-black fixed top-0 right-0 w-[300px] h-screen z-10 transition-all pt-10">
          <ul className="flex flex-col w-full items-center gap-5">
            <li className="hover:text-gray-500 transition-all text-4xl border-b pb-3 w-full text-center">
              <Link href="/">Category</Link>
            </li>
            <li className="hover:text-gray-500 transition-all text-4xl border-b pb-3 w-full text-center">
              <Link href="/">Category</Link>
            </li>
            <li className="hover:text-gray-500 transition-all text-4xl border-b pb-3 w-full text-center">
              <Link href="/">Category</Link>
            </li>
            <li className="hover:text-gray-500 transition-all  text-4xl border-b pb-3 w-full text-center">
              <Link href="/">Category</Link>
            </li>
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-4xl absolute top-2 right-2"
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
