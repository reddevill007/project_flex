import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavList = ({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  return (
    <div className="border-l fixed top-0 right-0 w-[300px] h-screen z-10 transition-all pt-10 flex flex-col justify-between bg-white">
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
      <Link onClick={() => signOut()} href="/">
        Logout
      </Link>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-4xl absolute top-2 right-2"
      >
        X
      </button>
    </div>
  );
};

export default NavList;
