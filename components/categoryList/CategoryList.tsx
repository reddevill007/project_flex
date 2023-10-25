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
      <div className="flex gap-10">
        {categories?.map((category: Category) => (
          <div key={category.id}>
            <Link href={`/blog?cat=${category.slug}`}>
              <div className="h-8 w-8 rounded-full bg-red-200"></div>
              <p>{category.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
