"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.bubble.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import dynamic from "next/dynamic";

import { app } from "@/utils/firebase";

const CreateProjectPage = () => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const { status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
            });
          }
        );
      }
    };

    file && upload();
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
        <option value="devops">devops</option>
        <option value="web dev">web dev</option>
      </select>
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
              <input
                type="file"
                id="image"
                onChange={(e) => handleSetFile(e)}
                className="hidden"
              />
              <label htmlFor="image">
                <div className="h-10 w-10 rounded-full bg-red-900 cursor-pointer" />
              </label>
            </button>
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-red-900" />
            </button>
            <button className="h-9 w-9 border rounded-full bg-transparent flex items-center justify-center cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-red-900" />
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
