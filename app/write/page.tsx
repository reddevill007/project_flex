"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { ColorRing } from "react-loader-spinner";
import { uploadImage } from "@/utils/uploadImage";
import Selection from "@/components/editor/Selection";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateProjectPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [media, setMedia] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);
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

    setUploading(false);
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
    <div className="mt-16 mx-auto w-[cacl(100%-250px)] ml-[250px] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold">Upload Your Project</h1>
      <p>Start Uploading you project and let world see it</p>
      <div className="relative w-[380px]">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="text"
          placeholder="Title"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="relative w-[380px]">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="text"
          placeholder="Technology Used"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => setTech(e.target.value)}
        />
      </div>
      <div className="relative w-[380px]">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="text"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          placeholder="Live Preview"
          onChange={(e) => setLiveLink(e.target.value)}
        />
      </div>
      <div className="relative w-[380px]">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="text"
          placeholder="Code Github Link"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => setCodeLink(e.target.value)}
        />
      </div>

      <Selection setCatSlug={setCatSlug} />
      <div className="flex gap-5">
        <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
          <label
            htmlFor="file"
            className="cursor-pointer text-center p-4 md:p-8"
          >
            <svg
              className="w-10 h-10 mx-auto"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                stroke="#4F46E5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="mt-3 text-gray-700 max-w-xs mx-auto">
              Click to{" "}
              <span className="font-medium text-indigo-600">
                Upload your file
              </span>{" "}
              or drag and drop your file here
            </p>
          </label>
          <input
            id="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => handleSetFile(e)}
            className="hidden"
          />
        </div>
      </div>
      <div>
        {file && (
          <div>
            <img src={URL.createObjectURL(file)} alt="Thumb" />
            <button onClick={removeSelectedImage}>Remove This Image</button>
          </div>
        )}
      </div>
      <ReactQuill
        className="w-[400px] mt-10 bg-red-900"
        theme="bubble"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder="Showcase your project"
      />
      <button
        className="rounded-full px-[20px] py-[10px] bg-green-900 w-fit items-center justify-center flex"
        onClick={handleSubmit}
      >
        {uploading ? (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
          />
        ) : (
          "Publish"
        )}
      </button>
    </div>
  );
};

export default CreateProjectPage;
