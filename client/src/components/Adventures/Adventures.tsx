import React from "react";
import AdventureCardList from "../AdventureCardList";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import Adventure, { ActiveAdv } from "../../models/Adventure";
import ActiveAdvenutre from "../ActiveAdventure";
import { UserProps } from "../../models/User";
import PhotoUpload from "../PhotoUpload";

const Adventures: FC<UserProps> = ({ user }) => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [activeAdventure, setActiveAdventure] = useState<ActiveAdv | null>(
    null
  );
  console.log(activeAdventure);
  useEffect(() => {
    getAdventureCards();
  }, []);

  const getAdventureCards = async () => {
    try {
      const response = await axios.get("/adventures/");

      setAdventures(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {activeAdventure ? (
        <ActiveAdvenutre user={user} activeAdventure={activeAdventure} />
      ) : (
        <AdventureCardList
          adventures={adventures}
          setActiveAdventure={setActiveAdventure}
        />
      )}
      <PhotoUpload />
    </div>
  );
};

export default Adventures;
