import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import React from "react";

const BlogPage = () => {
  return (
    <div className="container mt-16 mx-auto">
      <h1 className="w-full bg-red-300 text-center py-3 text-3xl">
        Blog Category
      </h1>
      <div className="flex">
        <CardList />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
