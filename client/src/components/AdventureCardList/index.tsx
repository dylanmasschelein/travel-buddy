import { useState } from "react";
import axios from "axios";
import "./AdventureCardList.scss";
import AdventureCard from "../AdventureCard";
// import Adventure from "../../models/Adventure";

type Adventure = {
  adventures: {
    title: string;
    country: string;
    length_of_stay: number;
    img: string;
  }[];
};

const AdventureCardList: React.FC<Adventure> = ({ adventures }) => {
  return (
    <div>
      <h1>Yopur Adventures</h1>
      {adventures.map((adventure) => (
        <div>
          <h2>{adventure.title}</h2>
          <p>{adventure.country}</p>
          <p>{adventure.length_of_stay}</p>
          <p>{adventure.img}</p>
        </div>
      ))}
    </div>
  );
};
export default AdventureCardList;
