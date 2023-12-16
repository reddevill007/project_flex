import React from "react";
import Navbar from "../navbar/Navbar";
import Featured from "../featured/Featured";
import TopCreators from "../menu/TopCreators";
import CardList from "../cardList/CardList";

type MainProps = {
  page: number;
  cat: string;
};

const Main = ({ page, cat }: MainProps) => {
  return (
    <div className="w-[calc(100%-250px)] ml-[250px] bg-[#fffbfd]">
      <Navbar />
      <Featured />
      <TopCreators />
      <CardList page={page} cat="" />
    </div>
  );
};

export default Main;
