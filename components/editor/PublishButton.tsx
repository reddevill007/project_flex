import React from "react";
import SpinnerLoader from "../loaders/SpinnerLoader";
import { Button } from "../ui/button";

interface PublishButtonProps {
  onClick: () => void;
  uploading: boolean;
}

const PublishButton: React.FC<PublishButtonProps> = ({
  onClick,
  uploading,
}) => {
  return (
    <Button className="mb-2" onClick={onClick}>
      {uploading ? <SpinnerLoader dark={false} /> : "Publish"}
    </Button>
  );
};

export default PublishButton;
