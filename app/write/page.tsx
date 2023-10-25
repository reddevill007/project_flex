"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { app } from "@/utils/firebase";
import { uploadImage } from "@/utils/uploadImage";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateProjectPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [media, setMedia] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");

  let updateMedia;

  useEffect(() => {
    if (file) {
      updateMedia = setMedia;
      uploadImage(file, updateMedia);
    }
  }, [file]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        tech,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "devops",
        projectLink: liveLink,
        projectCode: codeLink,
      }),
    });

    router.push(`/posts/${slugify(title)}`);
  };

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const removeSelectedImage = () => {
    setFile(null);
  };

  return (
    <div className="container mt-16 mx-auto">
      <input
        type="text"
        placeholder="Title"
        className="p-[50px] text-7xl bg-transparent outline-none placeholder:text-gray-400"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="tech"
        className="p-[50px] text-7xl bg-transparent outline-none placeholder:text-gray-400"
        onChange={(e) => setTech(e.target.value)}
      />
      <input
        type="text"
        placeholder="Live Preview"
        className="p-[50px] text-7xl bg-transparent outline-none placeholder:text-gray-400"
        onChange={(e) => setLiveLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code Github Link"
        className="p-[50px] text-7xl bg-transparent outline-none placeholder:text-gray-400"
        onChange={(e) => setCodeLink(e.target.value)}
      />
      <select
        className="text-black"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="web-development">Web Development</option>
        <option value="frontend-development">Frontend development</option>
        <option value="backend-development">Backend development</option>
        <option value="desktop-application-development">
          desktop-application-development
        </option>
        <option value="mobile-app-development">Mobile app development</option>
        <option value="cloud-computing">Cloud computing</option>
        <option value="application-development">Application development</option>
        <option value="full-stack-development">Full stack development</option>
      </select>
      <div className="flex gap-5 h-[700px] relative my-5">
        <button
          className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          +
        </button>
        {open && (
          <div className="flex gap-5 absolute z-[5] w-full left-[50px]">
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <input
                type="file"
                id="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleSetFile(e)}
                className="hidden"
              />
              <label htmlFor="image">
                <div className="h-10 w-10 rounded-full bg-red-900 cursor-pointer">
                  img
                </div>
              </label>
            </button>
          </div>
        )}

        <div>
          {file && (
            <div>
              <img src={URL.createObjectURL(file)} alt="Thumb" />
              <button onClick={removeSelectedImage}>Remove This Image</button>
            </div>
          )}
        </div>
        <ReactQuill
          className="w-full mt-10"
          theme="bubble"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder="Showcase your project"
        />
      </div>
      <button
        className="absolute top-[30px] right-[30px] z-[12] rounded-full px-[20px] py-[10px] bg-green-900"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default CreateProjectPage;
