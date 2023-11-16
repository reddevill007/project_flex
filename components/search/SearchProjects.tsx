"use client";

import { Post } from "@/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const getData = async (searchQuery: string) => {};

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
        className="px-5 py-1 w-[300px] sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        placeholder="What are you looking for?"
      />
      <button>Search</button>

      <div className="absolute top-20 left-0 w-full h-fit bg-pink-900">
        {!loading && projects?.length > 0 && query.length > 0 ? (
          <>
            {projects.map((project) => (
              <div key={project.id}>
                <img src="/images/logo.png" alt="" />
                <p>{project.title}</p>
              </div>
            ))}
          </>
        ) : loading ? (
          <Loader />
        ) : null}
      </div>
    </div>
  );
};

export default SearchProjects;
