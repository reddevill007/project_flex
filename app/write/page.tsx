"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const CreateProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="container mt-16 mx-auto">
      <input
        type="text"
        placeholder="Title"
        className="p-[50px] text-7xl bg-transparent outline-none placeholder:text-gray-400"
      />
      <div className="flex gap-5 h-[700px] relative">
        <button
          className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src="/background.jpg"
            className="h-10 w-10 rounded-full"
            alt=""
          />
        </button>
        {open && (
          <div className="flex gap-5 absolute z-[5] w-full left-[50px]">
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <img
                src="/background.jpg"
                className="h-10 w-10 rounded-full"
                alt=""
              />
            </button>
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <img
                src="/background.jpg"
                className="h-10 w-10 rounded-full"
                alt=""
              />
            </button>
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <img
                src="/background.jpg"
                className="h-10 w-10 rounded-full"
                alt=""
              />
            </button>
          </div>
        )}
        <ReactQuill
          className="w-full"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Showcase your project"
        />
      </div>
      <button className="absolute top-[30px] right-[30px] z-[12] rounded-full px-[20px] py-[10px] bg-green-900">
        Publish
      </button>
    </div>
  );
};

export default CreateProjectPage;
