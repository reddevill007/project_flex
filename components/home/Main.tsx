import React from "react";
import Navbar from "../navbar/Navbar";
import Featured from "../featured/Featured";
import TopCreators from "../menu/TopCreators";
import CardList from "../cardList/CardList";
import CategoryList from "../categoryList/CategoryList";

type MainProps = {
  page: number;
  cat: string;
};

const Main = ({ page, cat }: MainProps) => {
  return (
    <div className="w-full lg:w-[calc(100%-250px)] lg:ml-[250px] sm:ml-0 bg-[#fffbfd]">
      <Navbar />
      <Featured />
      <TopCreators />
      <CategoryList />
      <CardList page={page} cat="" />
    </div>
  );
};

export default Main;
