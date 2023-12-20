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
      <h1 className="text-4xl">Browse our top creators</h1>

      <div className="flex overflow-x-auto">
        {users.map((user: User) => (
          <div className="mb-4 p-4">
            <div className="mb-4">
              <Avatar className="mb-2 h-20 w-20">
                <AvatarImage
                  src={`https://robohash.org/${user.email}?set=set4`}
                  alt={user.name}
                  className="h-20 w-20"
                />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
              </div>
            </div>
            <Link href={`/user/${user.id}`}>
              <Button defaultValue="edit">Visit</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
