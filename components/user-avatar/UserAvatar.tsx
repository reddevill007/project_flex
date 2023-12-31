import { getInitials } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type Props = {
  userId: string | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
};
const UserAvatar = ({ userId, userName, userEmail }: Props) => {
  return (
    <Link href={`/user/${userId}`} className="z-1">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              className="z-1"
              src={`https://robohash.org/${userEmail}?set=set4`}
              alt={userName}
            />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium leading-none">{userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserAvatar;
