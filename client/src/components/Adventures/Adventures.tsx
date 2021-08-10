import AdventureCardList from "../AdventureCardList";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import Adventure, { ActiveAdv } from "../../models/Adventure";
import ActiveAdvenutre from "../ActiveAdventure";
import { User } from "../../models/User";

interface UserProps {
  user: User;
}

const Adventures: FC<UserProps> = ({ user }) => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [activeAdventure, setActiveAdventure] = useState<ActiveAdv | null>(
    null
  );

  useEffect(() => {
    getAdventureCards();
  }, []);

  const getAdventureCards = async () => {
    try {
      const response = await axios.get("/adventures/");

      setAdventures(response.data);
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
          user={user}
          adventures={adventures}
          setActiveAdventure={setActiveAdventure}
        />
      )}
    </div>
  );
};

export default Adventures;
