import { Post } from "@/types";
import { removeTags } from "@/utils/utils";
import Link from "next/link";

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
  const popularPost = popularPosts[0];
  const tech_arr = popularPost.tech.split(" ");

  return (
    <div className="w-full flex items-center justify-center container">
      <div className="w-[90%] bg-red-900 h-[400px] rounded-lg"></div>
    </div>
  );
};

export default Featured;
