import { Post } from "@/types";
import { removeTags } from "@/utils/utils";
import UserAvatar from "../user-avatar/UserAvatar";
import moment from "moment";
import { Button } from "../ui/button";

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts/mostViewedPost`
    );
    if (!res.ok) {
      throw new Error("Could not load categories");
    }

    return res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const Featured = async () => {
  const popularPosts: Post[] = await getData();
  const popularPost = popularPosts[1];

  const tech_arr = popularPost.tech.split(" ");

  return (
    <div className="w-full flex items-center justify-center container">
      <div className="w-[90%] bg-[#f0ecee] rounded-lg p-10 flex flex-col gap-2">
        <span className="bg-[#e45500] p-1 rounded w-fit text-[#dad3cf]">
          {popularPost.cat.title}
        </span>
        <UserAvatar
          userEmail={popularPost.user.email}
          userId={popularPost.user.id}
          userImage={popularPost.user.image}
          userName={popularPost.user.name}
        />
        <p className="text-gray-400 text-sm">
          {moment(popularPost.createdAt).fromNow()}
        </p>
        <h1 className="text-2xl font-bold">{popularPost.title}</h1>
        <div>
          {tech_arr.map((tech) => (
            <span className="mr-4 text-sm p-1 border border-black rounded-sm">
              {tech}
            </span>
          ))}
        </div>
        <p>{removeTags(popularPost.desc).substring(0, 400)}...</p>

        <div className="flex gap-4">
          <Button>Button1</Button>
          <Button>Button1</Button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
