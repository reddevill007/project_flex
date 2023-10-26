import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import { Post } from "@/types";
import NoPosts from "./NoPosts";

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

const CardList = async ({ page, cat }: { page: number; cat: string }) => {
  const { posts, count } = await getData(page, cat);
  posts.reverse();

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex-[5]">
      <h1 className="text-4xl">Recent Posts</h1>
      {posts.length === 0 && <NoPosts cat={cat} />}
      <div className="flex flex-col gap-4 mb-10">
        {posts.map((post: Post) => (
          <Card post={post} key={post.id} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} cat={cat} />
    </div>
  );
};

export default CardList;
