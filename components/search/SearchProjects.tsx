"use client";

import { Post } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import SearchResult from "./SearchResult";

const SearchProjects = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Post[]>([]);

  useEffect(() => {
    const handleSearh = async (query: string) => {
      setLoading(true);
      if (!query.trim()) {
        setProjects([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/searchProject?q=${query}`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Could not load categories");
        }
        const result = await res.json();

        setProjects(result.posts);
      } catch (error) {
        throw new Error("Something went wrong");
      }
      setLoading(false);
    };

    handleSearh(query);
  }, [query]);

  return (
    <div className="flex w-full items-center justify-center h-full relative">
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query || ""}
        className="px-5 py-2 w-[300px] border-[#dad3cf] border"
        placeholder="What are you looking for?"
      />

      <SearchResult loading={loading} projects={projects} query={query} />
    </div>
  );
};

export default SearchProjects;
