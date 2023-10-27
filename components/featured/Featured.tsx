import { Post } from "@/types";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts/mostViewedPost`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Could not load categories");
    }

    return res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const Featured = async () => {
  const popularPosts: Post[] = await getData();
  const popularPost = popularPosts[0];
  const tech_arr = popularPost.tech.split(" ");

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="container mx-auto flex h-full">
        <div className="w-1/2 h-full flex items-center justify-start -skew-x-2">
          <img
            src={popularPost.img}
            alt=""
            className="h-4/5 aspect-square object-cover"
          />
        </div>
        <div className="flex-1 h-full flex items-center justify-center gap-7 flex-col">
          <p className="w-full">#1 spotlight</p>
          <h1 className="text-5xl font-extrabold">{popularPost?.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: popularPost?.desc.substring(0, 300),
            }}
          />
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
          <div className="w-full">
            <p className="w-fit px-3 py-1 rounded-xl bg-blue-700/50">
              {popularPost?.cat?.title}
            </p>
          </div>
          <Link
            className="border px-3 py-2"
            href={`/posts/${popularPost.slug}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
