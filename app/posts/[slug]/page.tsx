import Link from "next/link";
import Comments from "@/components/comments/Comments";
import { Post } from "@/types";
import DeletePost from "@/components/button/DeletePost";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, removeTags } from "@/utils/utils";
import WpmReader from "@/components/project/WpmReader";
import UserDetails from "@/components/navbar/UserDetails";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import RelatedProjects from "@/components/project/RelatedProjects";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    return null;
  }

  return res.json();
};

const ProjectDetailPage = async ({ params }: any) => {
  const { slug } = params;

  const post: Post = await getData(slug);

  if (!post) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        Not Found
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:ml-[250px] sm:ml-0 pt-10 w-full lg:w-[calc(100%-250px)]">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col gap-2 w-full lg:max-w-[680px]">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <UserAvatar
            userEmail={post.user.email}
            userId={post.user.id}
            userName={post.user.name}
          />
          <WpmReader text={removeTags(post.desc)} />
          <p>{moment(post.createdAt).fromNow()}</p>

          <div className="w-full flex justify-center items-center gradient_background p-2 rounded-lg mb-4">
            {post.img ? (
              <img
                src={post.img}
                alt=""
                className="w-[90%] h-[500px] object-contain"
              />
            ) : (
              <img
                src={`/images/random/random${Math.floor(
                  Math.random() * 4 + 1
                )}.png`}
                alt=""
                className="w-72 h-72 object-contain"
              />
            )}
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: post.desc }}
            className="projectDesc"
          />
          <DeletePost id={post.id} authCheck={post.user.email} />
          <Comments postSlug={slug} />
          <RelatedProjects category={post?.cat?.slug} currentPostId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
