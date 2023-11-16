import CardList from "@/components/cardList/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import SearchProjects from "@/components/search/SearchProjects";
import { searchParams } from "@/types";

export default function Home({ searchParams }: searchParams) {
  const page = parseInt(searchParams?.page) || 1;
  return (
    <div className="h-screen w-full">
      <div className="w-full bg-black h-20 border-b fixed top-0 left-0 z-[100]">
        <SearchProjects />
      </div>
      <div className="flex w-full">
        <div className="w-[25%] bg-red-900 border-r h-[calc(100vh-80px)] fixed top-20 left-0">
          <ul className=" flex gap-10 flex-col">
            <li>Lorem 10</li>
            <li>Lorem 10</li>
            <li>Lorem 10</li>
            <li>Lorem 10</li>
            <li>Lorem 10</li>
          </ul>
        </div>
        <div className="w-[50%] mx-auto">
          <CardList page={page} cat="" />
        </div>
        <div className="w-[25%] border-r h-[calc(100vh-80px)] fixed top-20 right-0">
          <Menu />
        </div>
      </div>
    </div>
  );
}
