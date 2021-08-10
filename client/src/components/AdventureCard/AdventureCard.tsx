import { FC } from "react";
import "./AdventureCard.scss";
import Adventure from "../../models/Adventure";

const AdventureCard: FC<Adventure> = () => {
  return (
    <div>
      {/* <h2>{adventure.title}</h2>
      <p>{adventure.country}</p>
      <p>{adventure.length_of_stay}</p> */}
    </div>
  );
};
export default AdventureCard;
