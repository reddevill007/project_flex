import CardList from "@/components/cardList/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import { searchParams } from "@/types";

export default function Home({ searchParams }: searchParams) {
  const page = parseInt(searchParams?.page) || 1;
  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex w-full container mx-auto">
        <CardList page={page} cat="" />
        <Menu />
      </div>
    </div>
  );
}
