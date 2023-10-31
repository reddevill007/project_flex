"use client";

import { useRouter } from "next/navigation";

const DeletePost = ({ id }: { id: string }) => {
  const router = useRouter();
  const deleteProject = async (id: string) => {
    console.log("called");

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
        method: "DELETE",
      });

      console.log(res);

      alert("Post Delted");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(id);

  return (
    <button
      className="rounded bg-red-900 text-white px-3 py-2"
      onClick={() => deleteProject(id)}
    >
      DeletePost
    </button>
  );
};

export default DeletePost;
