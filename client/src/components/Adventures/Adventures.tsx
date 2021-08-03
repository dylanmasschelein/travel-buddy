import React from "react";
import AdventureCardList from "../AdventureCardList";
import AdventureCard from "../AdventureCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Adventure, { ActiveAdv } from "../../models/Adventure";
import ActiveAdvenutre from "../ActiveAdventure";

const Adventures = () => {
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
        <ActiveAdvenutre activeAdventure={activeAdventure} />
      ) : (
        <AdventureCardList
          adventures={adventures}
          setActiveAdventure={setActiveAdventure}
        />
      )}
    </div>
  );
};

export default Adventures;