import Main from "@/components/home/Main";
import { searchParams } from "@/types";

export default function Home({ searchParams }: searchParams) {
  const page = parseInt(searchParams?.page) || 1;

  return (
    <main>
      <Main page={page} cat="" />
    </main>
  );
}
