"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({
  page,
  hasPrev,
  hasNext,
  cat,
}: {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  cat: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between py-10">
      <button
        disabled={!hasPrev}
        className="border p-3 disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page - 1}&cat=${cat}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="border p-3 disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page + 1}&cat=${cat}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
