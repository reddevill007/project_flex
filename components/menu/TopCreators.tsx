import { User } from "@/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils/utils";
import Link from "next/link";
import { Button } from "../ui/button";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Could not load users");
    }

    return res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const TopCreators = async () => {
  const users: User[] = await getData();

  return (
    <div className="container mt-9">
      <h1 className="text-4xl mb-3">Browse our top creators</h1>

      <div className="flex overflow-x-auto gap-5 noscroll">
        {users.map((user: User) => (
          <Link
            key={user.id}
            href={`/user/${user.id}`}
            className="flex gap-2 w-fit border items-center justify-center p-3 rounded bg-muted"
          >
            <Avatar className="mb-2 h-10 w-10">
              <AvatarImage
                src={`https://robohash.org/${user.email}?set=set4`}
                alt={user.name}
                className="h-10 w-10"
              />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <p className="w-fit whitespace-nowrap">{user.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
