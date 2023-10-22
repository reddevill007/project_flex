import Link from "next/link";

import { Post } from "@/types";

const Card = ({ post }: { post: Post }) => {
  const tech_arr = post.tech.split(" ");

  return (
    <div className="flex w-full gap-4" key={post.id}>
      <div className="w-1/2 h-[300px]">
        {post.img && (
          <img src={post.img} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="w-1/2 h-[300px] flex flex-col justify-between">
        <span>{post.createdAt.toString().substring(0, 10)}</span>
        <span>{post.catSlug}</span>
        <h3>{post.title}</h3>
        <div>
          <div className="flex gap-2">
            {tech_arr.map((tech) => (
              <span className="w-fit px-3 py-1 rounded-xl bg-blue-700/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p>{post.desc}</p>
        <Link href={`/posts/${post.slug}`} className="border p-3 w-fit">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
