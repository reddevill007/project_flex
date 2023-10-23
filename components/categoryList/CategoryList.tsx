import { Category } from "@/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
  try {
    const res = await fetch("/api/categories", {
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
  const data = await getData();
  return (
    <div className="container mx-auto py-20">
      <h1>Populat Category</h1>
      <div className="flex gap-10">
        {data?.map((item: Category) => (
          <div key={item.id}>
            <Link href={`/blog?cat=${item.slug}`}>
              <div className="h-8 w-8 rounded-full bg-red-200"></div>
              <p>{item.title}</p>
              <p>{item.slug}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
