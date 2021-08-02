import { useState } from "react";
import axios from "axios";
import "./AdventureCardList.scss";
import AdventureCard from "../AdventureCard";
// import Adventure from "../../models/Adventure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Aus from "../../assets/images/Austrailia.jpg";

type Adventure = {
  adventures: {
    title: string;
    country: string;
    length_of_stay: number;
    img: string;
  }[];
  setActiveAdventure: (n: object) => void;
};

const AdventureCardList: React.FC<Adventure> = ({
  adventures,
  setActiveAdventure,
}) => {
  return (
    <div className='adventure'>
      <h1 className='adventure__heading'>
        Your Adventures
        <FontAwesomeIcon icon={faPlusCircle} className='adventure__new' />
      </h1>
      <div className='adventure__list'>
        {adventures.map((adventure, i) => (
          <div
            key={i}
            className='adventure__card'
            onClick={() => setActiveAdventure(adventure)}
          >
            <h2 className='adventure__title'>{adventure.title}</h2>
            <p className='adventure__country'>{adventure.country}</p>
            <p className='adventure__stay'>{adventure.length_of_stay} year</p>
            <img src={Aus} className='adventure__img' />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdventureCardList;
