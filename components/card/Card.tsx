import Link from "next/link";

import { Post } from "@/types";

const Card = ({ post }: { post: Post }) => {
  const tech_arr = post.tech.split(" ");

  return (
    <div className="flex w-full gap-4" key={post.id}>
      <div className="w-1/2 h-[300px]">
        {post.img ? (
          <img src={post.img} alt="" className="w-96 h-auto object-cover" />
        ) : (
          <img
            src="/background.jpg"
            alt=""
            className="w-96 h-auto object-cover"
          />
        )}
      </div>
      <div className="w-1/2 h-[300px] flex flex-col justify-between">
        <span>{post.createdAt.toString().substring(0, 10)}</span>
        <span>{post.cat.title}</span>
        <h3>{post.title}</h3>

        <Link href={`/user/${post.user.id}`}>
          <div className="flex items-center gap-4">
            <img
              src={post.user.image}
              alt={post.user.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-xl">{post.user.name}</p>
            </div>
          </div>
        </Link>
        <div>
          <div className="flex gap-2">
            {tech_arr.map((tech) => (
              <span
                className="w-fit px-3 py-1 rounded-xl bg-blue-700/50"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.desc.substring(0, 60) }} />
        <Link href={`/posts/${post.slug}`} className="border p-3 w-fit">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
