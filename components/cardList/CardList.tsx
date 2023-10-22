import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import { Post } from "@/types";

const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `http:localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Could not load categories");
  }

  return res.json();
};

const CardList = async ({ page, cat }: { page: number; cat: string }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex-[5]">
      <h1 className="text-4xl">Recent Posts</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post: Post) => (
          <Card post={post} key={post.id} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} cat={cat} />
    </div>
  );
};

export default CardList;
