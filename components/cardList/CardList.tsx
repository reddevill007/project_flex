import Pagination from "../pagination/Pagination";
import { Post } from "@/types";
import NoPosts from "./NoPosts";
import ProjectCard from "../card/ProjectCard";

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

  const POST_PER_PAGE = 10;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="container">
      <h1 className="text-4xl mb-3">Recent Posts</h1>
      {posts.length === 0 ? (
        <NoPosts cat={cat} />
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-10">
            {posts.map((post: Post) => (
              <ProjectCard post={post} key={post.id} />
            ))}
          </div>
          <Pagination
            page={page}
            hasNext={hasNext}
            hasPrev={hasPrev}
            cat={cat}
          />
        </>
      )}
    </div>
  );
};

export default CardList;
