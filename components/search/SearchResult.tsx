import React from "react";
import { Post } from "@/types";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

type SearchResultProp = {
  loading: boolean;
  projects: Post[];
  query: string;
};

const SearchResult = ({ loading, projects, query }: SearchResultProp) => {
  return (
    <div className="absolute top-[44px] left-0 w-full">
      {loading ? (
        <div className="rounded p-2 w-full h-fit bg-[#f0ecee] text-[#e45500] flex items-center justify-center">
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e45500", "#e45500", "#e45500", "#e45500", "#e45500"]}
          />
        </div>
      ) : projects?.length > 0 && query.length > 0 ? (
        <div className="rounded p-2 pt-0 w-full h-fit bg-[#f0ecee] text-[#e45500]">
          {projects.map((project) => (
            <Link
              href={`/posts/${project.slug}`}
              key={project.id}
              className="p-4"
            >
              <p className="">{project.title}</p>
            </Link>
          ))}
        </div>
      ) : query.length > 0 ? (
        <div className="rounded p-2 w-full h-fit bg-[#f0ecee] text-[#e45500]">
          <p>No Result Found</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResult;
