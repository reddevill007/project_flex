import React from "react";

const Featured = () => {
  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="container mx-auto flex h-full">
        <div className="w-1/2 h-full flex items-center justify-start -skew-x-2">
          <img
            src="/background.jpg"
            alt=""
            className="h-4/5 aspect-square object-cover"
          />
        </div>
        <div className="flex-1 h-full flex items-center justify-center gap-7 flex-col">
          <p className="w-full">#1 spotlight</p>
          <h1 className="text-5xl font-extrabold">
            Jon Stewarts Apple TV Plus show ends, reportedly over coverage of AI
            and China
          </h1>
          <p>
            According to reports, The Problem With Jon Stewart has been
            effectively canceled over editorial disagreements with Apple.
          </p>
          <div className="w-full">
            <p className="w-fit px-3 py-1 rounded-xl bg-blue-700/50">
              Category
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
