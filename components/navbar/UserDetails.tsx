import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils/utils";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function UserDetails() {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage
              className="z-1"
              src={`https://robohash.org/${data?.user?.email}?set=set3`}
              alt={data?.user?.name ? data?.user?.name : "profilepic"}
            />
            <AvatarFallback>{getInitials(data?.user?.name)}</AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
