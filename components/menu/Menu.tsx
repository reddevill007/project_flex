import { User } from "@/types";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

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

const Menu = async () => {
  const users: User[] = await getData();

  return (
    // <div className="flex-[2]">
    //   <div className="">
    //     {users.map((user: User) => (
    //       <div
    //         className="flex w-full justify-between border-b py-2"
    //         key={user.id}
    //       >
    //         <div className="flex items-center gap-4">
    //           <img
    //             src={user.image}
    //             alt={user.name}
    //             className="h-10 w-10 rounded-full"
    //           />
    //           <div>
    //             <p className="text-xl">{user.name}</p>
    //           </div>
    //         </div>
    // <Link
    //   href={`/user/${user.id}`}
    //   className="border text-lg text-white px-3 py-2 rounded bg-gray-600"
    // >
    //           View
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Browse top creators</CardTitle>
        <CardDescription>Here is the list of our top creators</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />
        <div className="space-y-4">
          <div className="grid gap-6">
            {users.map((user: User) => (
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link href={`/user/${user.id}`}>
                  <Button defaultValue="edit">Visit</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Menu;
