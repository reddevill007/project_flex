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
      <h1>Populat Category</h1>
      <div className="flex gap-10 overflow-x-scroll noscroll">
        {categories?.map((category: Category) => (
          <Link key={category.id} href={`/blog?cat=${category.slug}`}>
            <p className="border w-fit px-3 py-2 rounded-full whitespace-nowrap noscrollbar">
              &lt;/&gt; {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
