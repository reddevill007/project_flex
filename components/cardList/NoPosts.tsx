"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NoPosts = ({ cat }: { cat: string }) => {
  const { status } = useSession();

  return (
    <div>
      <div className="w-full p-10 bg-red-600">
        <img src="/nopost.jpg" alt="" />
        <h2>No Project for categeroy {cat}</h2>
        {status === "authenticated" ? (
          <Link href="/write" className="border px-3 py-2">
            Create One
          </Link>
        ) : (
          <Link href="/login" className="border px-3 py-2">
            Login to create one
          </Link>
        )}
      </div>
    </div>
  );
};

export default NoPosts;
