import { FC } from "react";
import "./AdventureCard.scss";
import Adventure from "../../models/Adventure";

const AdventureCard: FC<Adventure> = (adventure) => {
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
