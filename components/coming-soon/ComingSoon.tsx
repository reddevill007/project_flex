// ComingSoon.tsx
import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        {/* Simple SVG Illustration */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 mb-8 text-blue-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3l3 9l-3 9M21 9l-3 9l-6-4l-6 4l-3-9l3-9l6 4l6-4l3 9z"
          />
        </svg>

        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg">Stay tuned for exciting updates!</p>
      </div>
    </div>
  );
};

export default ComingSoon;
