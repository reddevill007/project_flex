import { Post } from "@/types";
import { calculateMinuteRead, removeTags } from "@/utils/utils";
import moment from "moment";
import Link from "next/link";

type RelatedProjectsProps = {
  category: string;
  currentPostId: string;
};

const getData = async (page: number, cat: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Could not load categories");
    }

    return res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const RelatedProjects: React.FC<RelatedProjectsProps> = async ({
  category,
  currentPostId,
}) => {
  const { posts } = await getData(1, category);

  return (
    <div>
      <h1 className="mb-5 text-4xl border-b pb-3">Related Post</h1>
      <div>
        {posts
          .filter((post: Post) => post.id !== currentPostId)
          .map((post: Post) => (
            <div key={post.id} className="mb-4 border-b pb-3">
              <Link href={`/posts/${post.slug}`}>
                <h1 className="mb-2 font-bold text-2xl">{post.title}</h1>
              </Link>
              <p className="text-gray-500 mb-4">
                {removeTags(post.desc).slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 ">
                {calculateMinuteRead(removeTags(post.desc))} min .{" "}
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
