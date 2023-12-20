import React from "react";
import { ColorRing } from "react-loader-spinner";

type SpinnerLoaderProps = {
  dark: boolean;
};

const SpinnerLoader = ({ dark }: SpinnerLoaderProps) => {
  const spinnerColor: [string, string, string, string, string] = dark
    ? ["#000", "#000", "#000", "#000", "#000"]
    : ["#fff", "#fff", "#fff", "#fff", "#fff"];

  return (
    <ColorRing
      visible={true}
      height="30"
      width="30"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={spinnerColor}
    />
  );
};

export default SpinnerLoader;
