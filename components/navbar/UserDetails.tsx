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

export default function UserDetails() {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-12 h-12 bg-black flex items-center justify-center cursor-pointer">
          <AvatarImage
            className="z-1 h-10 w-10"
            src={`https://robohash.org/${data?.user?.email}?set=set4`}
            alt={data?.user?.name ? data?.user?.name : "profilepic"}
          />
          <AvatarFallback>{getInitials(data?.user?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
