import React from "react";
import dynamic from "next/dynamic";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <SpinnerLoader dark={false} />,
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules: Record<string, unknown>;
  placeholder: string;
}

const RichTextEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  modules,
  placeholder,
}) => {
  return (
    <ReactQuill
      className="w-[400px] mt-10 border h-36"
      theme="bubble"
      value={value}
      onChange={(content) => onChange(content as string)}
      modules={modules}
      placeholder={placeholder}
    />
  );
};

export default RichTextEditor;
