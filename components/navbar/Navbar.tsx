"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SearchProjects from "../search/SearchProjects";
import UserDetails from "./UserDetails";
import Link from "next/link";

const Navbar = () => {
  const { status, data } = useSession();

  return (
    <nav className="w-full pt-6 mb-9">
      <div className="container flex justify-between items-center h-full">
        <div>
          {status === "unauthenticated" ? (
            <div className="text-[#091151]">
              <h1 className="text-4xl font-bold">Welcome to ProjecrFlex.</h1>
              <p className="text-[#dad3cf]">
                Please{" "}
                <Link className="text-[#e45500] underline" href="/login">
                  login
                </Link>{" "}
                to explore our full feature
              </p>
            </div>
          ) : (
            <div className="text-[#091151]">
              <h1 className="text-4xl font-bold">Welcome to ProjecrFlex.</h1>
              <p className="text-[#dad3cf]">
                Hello {data?.user?.name}, Welcome Back!!
              </p>
            </div>
          )}
        </div>

        <div>
          <SearchProjects />
        </div>

        {status === "unauthenticated" ? "Login" : <UserDetails />}
      </div>
    </nav>
  );
};

export default Navbar;
