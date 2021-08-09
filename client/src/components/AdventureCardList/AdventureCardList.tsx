import { useState } from "react";
import axios from "axios";
import "./AdventureCardList.scss";
import AddAdventureForm from "../AddAdventureForm";
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
  user: { name: string; email: string; id: number };
};

const AdventureCardList: React.FC<Adventure> = ({
  adventures,
  setActiveAdventure,
  user,
}) => {
  const [openForm, setOpenForm] = useState(false);

  const newAdventureHandler = async (id, country, stay, title) => {
    const data = {
      id,
      country,
      stay,
      title,
    };
    try {
      await axios.post(`/adventures/`, data);

      console.log("New Adventure created!");
    } catch (err) {}
  };
  return (
    <div className='adventure'>
      <h1 className='adventure__heading'>
        Your Adventures
        <FontAwesomeIcon
          icon={faPlusCircle}
          onClick={() => setOpenForm(!openForm)}
          className='adventure__new'
        />
      </h1>
      {openForm && (
        <AddAdventureForm
          user={user}
          newAdventureHandler={newAdventureHandler}
        />
      )}
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
