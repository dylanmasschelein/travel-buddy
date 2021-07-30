import { FC } from "react";
import "./AdventureCard.scss";

interface Adventure {
  adventure: {
    title: string;
    country: string;
    length_of_stay: number;
    img: any;
  };
}

const AdventureCard: FC<Adventure> | null = ({ adventure }) => {
  return (
    <div>
      <h2>{adventure.title}</h2>
      <p>{adventure.country}</p>
      <p>{adventure.length_of_stay}</p>
      <p>{adventure.img}</p>
    </div>
  );
};
export default AdventureCard;
