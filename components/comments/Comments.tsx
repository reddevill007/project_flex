import React from "react";

const Comments = () => {
  const status = "authenticated";
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <textarea className="w-4/5 max-h-10" placeholder="write a comment..." />
        <button className="border px-2 py-4">Post</button>
      </div>
      <div>
        <ul>
          <li>Comment 1</li>
          <li>Comment 2</li>
          <li>Comment 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Comments;
