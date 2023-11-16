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
    <Card className="shadow-none rounded-none fixed top-[81px] right-0 border-x border-y-1 border">
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
