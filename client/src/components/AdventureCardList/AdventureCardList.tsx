import { useState } from "react";
import axios from "axios";
import "./AdventureCardList.scss";
import AddAdventureForm from "../AddAdventureForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Adventure from "../../models/Adventure";
import { User } from "../../models/User";
import ModalWindow from "../ModalWindow";

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
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<number>();

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

  const editAdventure = async (e, title, country, stay, file) => {
    e.preventDefault();
    const data = {
      title,
      country,
      stay,
      file,
    };
    try {
      await axios.put(`/adventure/${id}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='adventure'>
      <h1 className='adventure__heading'>Your Adventures</h1>
      <div className='adventure__list'>
        {adventures.map((adventure) => (
          <div key={adventure.id}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => {
                setEdit(!edit);
                setId(adventure.id);
              }}
              className='adventure__edit'
            />
            <div
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
          </div>
        ))}
      </div>
      {edit && <ModalWindow id={id} editAdventure={editAdventure} />}
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
