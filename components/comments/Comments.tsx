"use client";

import { Comments } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

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
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handlesubmit = async () => {
    console.log("clicked");

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };
  return (
    <div className="w-full">
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div>
          <textarea
            placeholder="write a comment..."
            className="w-4/5 max-h-10 text-black"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="border px-2 py-4" onClick={handlesubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      {isLoading
        ? "Loading..."
        : data?.map((comment: Comments) => (
            <div key={comment.id}>
              <img
                src={comment.user.image}
                alt={comment.user.name}
                className="h-10 w-10 rounded-full"
              />
              <p>{comment.user.name}</p>
              <p>{comment.desc}</p>
              <p>{comment.createdAt.toString().substring(0, 10)}</p>
            </div>
          ))}
    </div>
  );
};

export default Comments;
