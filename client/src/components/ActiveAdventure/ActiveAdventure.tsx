import axios from "axios";
import { FC, useState, useEffect } from "react";
import "./ActiveAdventure.scss";
import { ActiveAdv } from "../../models/Adventure";
import { loadMapApi } from "../../utils/google-maps-config";
import AdventureMap from "../AdventureMap";

type ActiveAdventure = {
  activeAdventure: ActiveAdv;
};

const ActiveAdventure: FC<ActiveAdventure> = ({ activeAdventure }) => {
  const [coords, setCoords] = useState<string[]>([]);
  const [locations, setLocations] = useState<object[]>([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    getLocations(activeAdventure.id);
  }, []);

  const getLocations = async (id) => {
    try {
      const locations = await axios.get(`/locations/${id}`);
      const coordinates = [];
      locations.data.forEach((location) => {
        coordinates.push(location.coords);
      });
      setCoords(coordinates);
      setLocations(locations.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", () => {
      setScriptLoaded(true); // change to true to display map
    });
  }, []);

  const addLocation = async () => {
    if (!data) alert("You need to add a marker to add a location!");
    try {
      await axios.post("/locations/", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='active-acventure'>
      <h1 className='active-adventure__header'>{activeAdventure.title}</h1>
      <p className='active-adventure__info'>{activeAdventure.country}</p>
      <button onClick={() => addLocation()}>Add Location</button>
      <div className='active-adventure__map'>
        {scriptLoaded && (
          <AdventureMap
            mapType={google.maps.MapTypeId.ROADMAP}
            mapTypeControl={true}
            setData={setData}
          />
        )}
      </div>
    </div>
  );
};
export default ActiveAdventure;
