import { Post } from "@/types";
import PostBody from "./PostBody";

const Card = ({ post }: { post: Post }) => {
  const tech_arr = post.tech.split(" ");

  return (
    <div className="flex w-full gap-4" key={post.id}>
      <div className="w-1/2 h-[300px] flex items-center justify-center">
        {post.img ? (
          <img
            src={post.img}
            alt=""
            className="w-auto h-96 object-contain rounded-[10px]"
          />
        ) : (
          <img
            src="/background.jpg"
            alt=""
            className="w-auto h-[100px] object-contain  rounded-[10px]"
          />
        )}
      </div>
      <PostBody post={post} />
    </div>
  );
};

export default Card;
