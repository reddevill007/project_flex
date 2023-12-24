import EditProfile from "@/components/edit-profile/EditProfile";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { User } from "@/types";
import { convertToTitleCase } from "@/utils/constants";
import { removeTags } from "@/utils/utils";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Could not load categories");
  }

  return res.json();
};

const UserDetailPage = async ({ params }: any) => {
  const { slug } = params;

  const user: User = await getData(slug);

  const getTechArray = (tech: string): string[] => {
    const tech_arr = tech.split(" ");
    return tech_arr;
  };

  return (
    <div className="w-[calc(100%-250px)] ml-[250px] mx-auto">
      {/* Header */}
      <div className="w-full h-[200px] bg-red-900 relative mb-16">
        <img
          src="https://source.unsplash.com/random/1220x420/?code"
          className="h-full w-full object-cover"
          alt=""
        />
        <div className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 flex items-center bg-black rounded-full p-2">
          <img
            src={`https://robohash.org/${user.email}?set=set4`}
            className="rounded-full h-28 w-28"
            alt=""
          />
          <EditProfile id={user.id} authCheck={user.email} />
        </div>
      </div>

      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>

      <h2 className="text-3xl">Posts ({user.Post.length})</h2>
      <div className="flex items-start justify-center flex-wrap w-full gap-10 mb-10">
        {user.Post.map((post) => (
          <div
            className="w-[300px] border p-3 rounded-lg bg-muted"
            key={post.id}
          >
            <UserAvatar
              userEmail={user.email}
              userId={user.id}
              userImage={user.image}
              userName={user.name}
            />
            <Separator className="my-3" />
            <div className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-800 to-cyan-600 p-2 rounded-lg mb-4">
              {post.img ? (
                <img
                  src={post.img}
                  alt=""
                  className="w-72 h-72 object-contain"
                />
              ) : (
                <img
                  src={`/images/random/random${Math.floor(
                    Math.random() * 4 + 1
                  )}.png`}
                  alt=""
                  className="w-72 h-72 object-contain"
                />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-400 text-sm mb-4">
                {moment(post.createdAt).fromNow()}
              </p>
              <span className="bg-[#e45500] p-1 rounded w-fit text-[#dad3cf] mb-2 text-sm">
                {convertToTitleCase(post.catSlug)}
              </span>
              <h3 className="text-2xl mb-2">{post.title}</h3>
              <p className="truncate mb-2">
                {removeTags(post.desc).substring(0, 250)}
              </p>
              <div className="w-full flex justify-end items-center px-4">
                <Link href={`/posts/${post.slug}`}>
                  <ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl">Comments ({user.Comments.length})</h2>
      <div>
        {user.Comments.map((comment: any) => (
          <div key={comment.id}>
            <p className="text-xs">
              {comment.createdAt.toString().substring(0, 10)}
            </p>
            <p>{comment.desc}</p>
            <Link href={`/posts/${comment.postSlug}`}>
              <h1>{comment.postSlug}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailPage;
