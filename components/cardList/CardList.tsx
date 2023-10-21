import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import { Post } from "@/types";

const getData = async (page: number) => {
  const res = await fetch(`http:localhost:3000/api/posts?page=${page}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Could not load categories");
  }

  return res.json();
};

const CardList = async ({ page }: { page: number }) => {
  const posts = await getData(page);
  console.log(posts);

  return (
    <div className="flex-[5]">
      <h1 className="text-4xl">Recent Posts</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post: Post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
