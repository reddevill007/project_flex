"use client";

import { Comment } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import moment from "moment";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handlesubmit = async () => {
    if (desc.length === 0) {
      toast.error("comment can not be empty");
      return;
    }

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
    setDesc("");
    toast.success("comment added");
  };
  return (
    <div className="w-full">
      <h1 className="mb-5 text-4xl">Comments</h1>
      {status === "authenticated" ? (
        <div className="mb-5">
          <textarea
            placeholder="write a comment..."
            className="w-4/5 max-h-10 text-black"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="border px-2 py-4" onClick={handlesubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-10">
          {data?.map((comment: Comment) => (
            <div
              key={comment.id}
              className="w-full p-10 rounded-lg bg-white text-gray-700 flex flex-col gap-5 border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://robohash.org/${comment.user.email}?set=set4`}
                  alt={comment.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-xl">{comment.user.name}</p>
                  <p className="text-gray-400 text-sm">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <p>{comment.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
