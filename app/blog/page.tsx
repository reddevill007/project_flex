import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import { searchCatParams } from "@/types";
import React from "react";

const BlogPage = ({ searchParams }: searchCatParams) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  return (
    <div className="container mt-16 mx-auto">
      <h1 className="w-full bg-red-300 text-center py-3 text-3xl">
        {cat.toUpperCase()}
      </h1>
      <div className="flex">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
