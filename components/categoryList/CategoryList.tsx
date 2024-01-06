import { Category } from "@/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const CategoryList = async () => {
  const categories = await getData();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl mb-3">Populat Category</h1>
      <img src="/desktop.svg" className="h-5 w-5" alt="img" />
      <div className="flex gap-4 overflow-x-scroll noscroll">
        {categories?.map((category: Category) => (
          <Link
            key={category.id}
            href={`/blog?cat=${category.slug}`}
            className="flex gap-2 w-fit border items-center justify-center p-3 rounded bg-muted"
          >
            <div className="bg-white p-2 rounded-full text-white h-fit">
              <img src={category.img} alt="img" />
            </div>
            <p className="w-fit whitespace-nowrap">{category.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
