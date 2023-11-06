import Link from "next/link";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/menu/Menu";
import { Post } from "@/types";
import DeletePost from "@/components/button/DeletePost";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <DeletePost id={post.id} authCheck={post.user.email} />
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
        <Link href={`/user/${post.user.id}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.user.image} alt={post.user.name} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {post.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.user.email}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>

      <div className="flex mb-10">
        <div
          className="projectDesc"
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
        <Menu />
      </div>
      <Comments postSlug={slug} />
    </div>
  );
};

export default ProjectDetailPage;
