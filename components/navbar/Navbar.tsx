"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthLinks from "../authLinks/AuthLinks";
import { signOut, useSession } from "next-auth/react";
import NavList from "./NavList";

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
            {status === "authenticated" ? (
              <>
                <li className="hover:text-gray-500 transition-all">
                  <Link href="/write">Write</Link>
                </li>
                <li>/</li>
              </>
            ) : (
              <>
                <li className="hover:text-gray-500 transition-all">
                  <Link href="/login">Login</Link>
                </li>
                <li>/</li>
              </>
            )}
          </ul>
          <button onClick={() => setIsOpen(!isOpen)} className="text-4xl">
            +
          </button>
        </div>
      </div>
      {isOpen && <NavList setIsOpen={setIsOpen} isOpen={isOpen} />}
    </>
  );
};

export default Navbar;
