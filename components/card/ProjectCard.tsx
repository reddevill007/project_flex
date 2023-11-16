import moment from "moment";
import { ChevronRight } from "lucide-react";

import { Post } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { removeTags } from "@/utils/utils";
import UserAvatar from "../user-avatar/UserAvatar";
import Link from "next/link";

const ProjectCard = ({ post }: { post: Post }) => {
  return (
    <Card className="lg:max-w-md w-full">
      <CardHeader>
        <UserAvatar
          userEmail={post.user.email}
          userId={post.user.id}
          userImage={post.user.image}
          userName={post.user.name}
        />
        <p className="text-gray-400 text-sm">
          {moment(post.createdAt).fromNow()}
        </p>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <CardDescription>
          {removeTags(post.desc).substring(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        {post.img ? (
          <img src={post.img} alt="" className="w-full rounded" />
        ) : (
          <img
            src={`/images/random/random${Math.floor(
              Math.random() * 4 + 1
            )}.png`}
            alt={post.slug}
            className="w-full rounded"
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end items-center px-4">
          <Link href={`/posts/${post.slug}`}>
            <ChevronRight />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
