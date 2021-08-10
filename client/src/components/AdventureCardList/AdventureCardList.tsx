import { useState } from "react";
import axios from "axios";
import "./AdventureCardList.scss";
import AddAdventureForm from "../AddAdventureForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Adventure from "../../models/Adventure";
import { User } from "../../models/User";

interface AdventureProps {
  adventures: Adventure[];
  setActiveAdventure: (n: object) => void;
  user: User;
}

const AdventureCardList: React.FC<AdventureProps> = ({
  adventures,
  setActiveAdventure,
  user,
}) => {
  const [openForm, setOpenForm] = useState(false);

  const newAdventureHandler = async (id, country, stay, title, file) => {
    const data = new FormData();
    data.append("photo", file);
    data.append("id", id);
    data.append("country", country);
    data.append("stay", stay);
    data.append("title", title);

    try {
      await axios.post(`/adventures/`, data);

      console.log("New Adventure created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='adventure'>
      <h1 className='adventure__heading'>Your Adventures</h1>
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
            <img
              src={`/adventures/photo/${adventure.photo}`}
              className='adventure__img'
            />
          </div>
        ))}
      </div>
      <h3 className='adventure__add'>
        Add new adventure
        <FontAwesomeIcon
          icon={faPlusCircle}
          onClick={() => setOpenForm(!openForm)}
          className='adventure__new'
        />
      </h3>
      {openForm && (
        <>
          <AddAdventureForm
            user={user}
            newAdventureHandler={newAdventureHandler}
          />
        </>
      )}
    </div>
  );
};
export default AdventureCardList;
