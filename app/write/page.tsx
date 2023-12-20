"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import InputField from "@/components/editor/InputFeild";
import FileInput from "@/components/editor/FileInput";
import SelectedImage from "@/components/editor/SelectedImage";
import PublishButton from "@/components/editor/PublishButton";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { richTextEditorModules } from "@/utils/constants";

const CreateProjectPage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const [details, setDetails] = useState({
    title: "",
    tech: "",
    liveLink: "",
    codeLink: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditorChange = (content: string) => {
    setValue(content);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const removeSelectedImage = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: details.title,
          tech: details.tech,
          desc: value,
          img: file ? URL.createObjectURL(file) : "",
          catSlug: catSlug || "devops",
          projectLink: details.liveLink,
          projectCode: details.codeLink,
        }),
      });

      if (res.ok) {
        const postData = await res.json();
        const createdSlug = postData.slug;

        setUploading(false);
        router.push(`/posts/${createdSlug}`);
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error during project creation:", error);
      setUploading(false);
    }
  };

  return (
    <div className="mt-16 mx-auto w-[calc(100%-250px)] ml-[250px] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold">Upload Your Project</h1>
      <p>Start Uploading your project and let the world see it</p>

      {status === "loading" && <SpinnerLoader dark={false} />}

      {status === "authenticated" && (
        <>
          <InputField
            type="text"
            placeholder="Title"
            name="title"
            value={details.title}
            onChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Technology Used"
            name="tech"
            value={details.tech}
            onChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Live Preview"
            name="liveLink"
            value={details.liveLink}
            onChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Code Github Link"
            name="codeLink"
            value={details.codeLink}
            onChange={handleChange}
          />
          <FileInput onChange={handleFileChange} />
          {file && <SelectedImage file={file} onRemove={removeSelectedImage} />}
          <RichTextEditor
            value={value}
            onChange={handleEditorChange}
            modules={richTextEditorModules}
            placeholder="Showcase your project"
          />
          <PublishButton onClick={handleSubmit} uploading={uploading} />
        </>
      )}
    </div>
  );
};

export default CreateProjectPage;
