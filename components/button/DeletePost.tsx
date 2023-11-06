"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DeletePost = ({ id, authCheck }: { id: string; authCheck: string }) => {
  const router = useRouter();
  const { data } = useSession();

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const CHECK_USER_AUTHORITY = data?.user?.email === authCheck;

  return (
    <>
      {CHECK_USER_AUTHORITY ? (
        <button
          className="rounded bg-red-900 text-white px-3 py-2"
          onClick={() => deleteProject(id)}
        >
          DeletePost
        </button>
      ) : null}
    </>
  );
};

export default DeletePost;
