import React from "react";
import AdventureCardList from "../AdventureCardList";
import AdventureCard from "../AdventureCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Adventure from "../../models/Adventure";

const Adventures = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [activeAdventure, setActiveAdventure] = useState<object>({});
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
      <AdventureCardList
        adventures={adventures}
        setActiveAdventure={setActiveAdventure}
      />
    </div>
  );
};

export default Adventures;
