import { Comments, User } from "@/types";
import Link from "next/link";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Could not load categories");
  }

  return res.json();
};

const UserDetailPage = async ({ params }: any) => {
  const { slug } = params;

  const user: User = await getData(slug);

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="w-full h-[200px] bg-red-900 relative mb-16">
        <img src="/bg.jpeg" className="h-full w-full object-cover" alt="" />
        <div className="absolute bottom-0 translate-y-1/2 left-4 flex items-center">
          <img src={user.image} className="rounded-full h-20 w-20" alt="" />
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl">Posts ({user.Post.length})</h2>
      <div className="flex items-center justify-center flex-wrap w-full gap-10 mb-10">
        {user.Post.map((post) => (
          <div className="w-[300px] border" key={post.id}>
            <div>
              {post.img ? (
                <img
                  src={post.img}
                  alt=""
                  className="w-96 h-auto object-cover"
                />
              ) : (
                <img
                  src="/background.jpg"
                  alt=""
                  className="w-96 h-auto object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <span>{post.createdAt.toString().substring(0, 10)}</span>
              <span>{post.catSlug}</span>
              <h3>{post.title}</h3>
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: post.desc.substring(0, 100),
                }}
              /> */}
              <Link href={`/posts/${post.slug}`} className="border p-3 w-fit">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl">Comments ({user.Comments.length})</h2>
      <div>
        {user.Comments.map((comment: any) => (
          <div key={comment.id}>
            <p className="text-xs">
              {comment.createdAt.toString().substring(0, 10)}
            </p>
            <p>{comment.desc}</p>
            <Link href={`/posts/${comment.postSlug}`}>
              <h1>{comment.postSlug}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailPage;
