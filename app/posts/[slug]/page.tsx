import Link from "next/link";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/menu/Menu";
import { Post } from "@/types";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Could not load categories");
  }

  return res.json();
};

const ProjectDetailPage = async ({ params }: any) => {
  const { slug } = params;

  const post: Post = await getData(slug);

  return (
    <div className="container mx-auto">
      <div>
        <img src={post.img} alt="efcd" />
        <h1 className="mb-10 text-7xl">{post.title}</h1>
      </div>

      <div className="flex w-full gap-4 mb-10">
        <Link
          className="px-3 py-2 border"
          href={post.projectLink}
          target="_blank"
        >
          Project Preview
        </Link>
        <Link
          className="px-3 py-2 border"
          href={post.projectCode}
          target="_blank"
        >
          Project Code
        </Link>
      </div>

      <div>
        <img src={post.user.image} className="h-10 w-10 rounded-full" alt="" />
        <p>
          {post.user.name}, {post.createdAt.toString().substring(0, 10)}
        </p>
      </div>

      <div className="flex mb-10">
        <div
          className="flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
        <Menu />
      </div>
      <Comments postSlug={slug} />
    </div>
  );
};

export default ProjectDetailPage;
