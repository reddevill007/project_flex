import Link from "next/link";
import { Eye } from "lucide-react";
import moment from "moment";

import { Post } from "@/types";
import { removeTags } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const PostBody = ({ post }: { post: Post }) => {
  return (
    <div className="w-1/2 h-[300px] flex flex-col justify-between">
      <h3 className="text-2xl">{post.title}</h3>
      <p className="text-sm text-muted-foreground">
        {moment(post.createdAt).fromNow()}
      </p>

      <Link href={`/user/${post.user.id}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.user.image} alt={post.user.name} />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {post.user.name}
              </p>
              <p className="text-sm text-muted-foreground">{post.user.email}</p>
            </div>
          </div>
        </div>
      </Link>
      <span className="border px-3 py-2 w-fit rounded text-sm">
        {post.cat.title}
      </span>
      <div className="flex gap-2 items-center text-sm text-muted-foreground">
        <Eye size={16} color="#78716C" />
        <p>{post.views}</p>
      </div>
      <p className="text-sm text-black">
        {removeTags(post.desc).substring(0, 100)}...
      </p>
      <Link href={`/posts/${post.slug}`}>
        <Button>View</Button>
      </Link>
    </div>
  );
};

export default PostBody;
