import React from "react";

interface SelectedImageProps {
  file: File;
  onRemove: () => void;
}

const SelectedImage: React.FC<SelectedImageProps> = ({ file, onRemove }) => {
  return (
    <div>
      <img src={URL.createObjectURL(file)} alt="Thumb" />
      <button onClick={onRemove}>Remove This Image</button>
    </div>
  );
};

export default SelectedImage;
