import { Post } from "@/types";
import React from "react";

const Card = ({ key, post }: { key: string; post: Post }) => {
  const tech_arr = post.tech.split(" ");

  return (
    <div className="flex w-full gap-4" key={key}>
      <div className="w-1/2 h-[300px]">
        {post.img && (
          <img src={post.img} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="w-1/2 h-[300px] flex flex-col justify-between">
        <span>{post.createdAt.toString()}</span>
        <span>{post.catSlug}</span>
        <h3>{post.title}</h3>
        <p>
          <div className="flex gap-2">
            {tech_arr.map((tech) => (
              <span className="w-fit px-3 py-1 rounded-xl bg-blue-700/50">
                {tech}
              </span>
            ))}
          </div>
        </p>
        <p>{post.desc}</p>
        <button className="border p-3">Read mORe</button>
      </div>
    </div>
  );
};

export default Card;
