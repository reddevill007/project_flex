import React from "react";
import SpinnerLoader from "../loaders/SpinnerLoader";

interface PublishButtonProps {
  onClick: () => void;
  uploading: boolean;
}

const PublishButton: React.FC<PublishButtonProps> = ({
  onClick,
  uploading,
}) => {
  return (
    <button
      className="rounded-full px-[20px] py-[10px] bg-green-900 w-fit items-center justify-center flex"
      onClick={onClick}
    >
      {uploading ? <SpinnerLoader dark={false} /> : "Publish"}
    </button>
  );
};

export default PublishButton;
