import { getInitials } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type Props = {
  userId: string | undefined;
  userName: string | undefined;
  userImage: string | undefined;
  userEmail: string | undefined;
};
const UserAvatar = ({ userId, userName, userImage, userEmail }: Props) => {
  return (
    <Link href={`/user/${userId}`} className="z-1">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              className="z-1"
              src={`https://robohash.org/${userId}?set=set3`}
              alt={userName}
            />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserAvatar;
