import axios from "axios";
import { FC, useState, useEffect } from "react";
import "./ActiveAdventure.scss";
import { ActiveAdv } from "../../models/Adventure";
import { loadMapApi } from "../../utils/google-maps-config";
import AdventureMap from "../AdventureMap";
import LocationCard from "../LocationCard";
import Photos from "../Photos";
import Recommendations from "../Recommendations";
import { Coords } from "../../models/Adventure";
import { Blog } from "../../models/Blog";
import { User } from "../../models/User";
import Location from "../../models/Location";

interface ActiveAdventureProps {
  activeAdventure: ActiveAdv;
  user: User;
}

const ActiveAdventure: FC<ActiveAdventureProps> = ({
  user,
  activeAdventure,
}) => {
  const [coords, setCoords] = useState<Coords[]>([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [data, setData] = useState<object | null>(null);
  const [location, setLocation] = useState<Location[]>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    getLocations(activeAdventure.id);
  }, [location]);

  const getLocations = async (id) => {
    try {
      const locations = await axios.get(`/locations/${id}`);
      const coordinates = [];
      locations.data.forEach((location) => {
        coordinates.push({
          id: location.id,
          coords: JSON.parse(location.coords),
        });
      });
      setCoords(coordinates);
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

  const getClickedLocation = async (id) => {
    try {
      const location = await axios.get(`/locations/active/${id}`);
      setLocation(location.data);
      getBlogs(id);
      getPhotos(id);
      console.log("Location Recieved!!");
    } catch (err) {
      console.error(err);
    }
  };

  const getBlogs = async (location_id) => {
    try {
      const response = await axios.get(`/blogs/${location_id}`);

      setBlogs(response.data);
      console.log("Recieved and set blogs!");
    } catch (err) {
      console.error(err);
    }
  };

  const getPhotos = async (id) => {
    try {
      const response = await axios.get(`/photos/${id}`);
      setPhotos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='active-adventure'>
      <div className='active-adventure__container'>
        <h1 className='active-adventure__header'>{activeAdventure.title}</h1>
        {/* <p className='active-adventure__info'>{activeAdventure.country}</p> */}
      </div>
      <div className='active-adventure__map'>
        {scriptLoaded && (
          <AdventureMap
            mapType={google.maps.MapTypeId.ROADMAP}
            mapTypeControl={true}
            setData={setData}
            coords={coords}
            getClickedLocation={getClickedLocation}
            adventureId={activeAdventure.id}
            addLocation={addLocation}
          />
        )}
      </div>
      {location && (
        <LocationCard blogs={blogs} user={user} location={location} />
      )}
      {location && <Photos photos={photos} location={location} />}
      {location && <Recommendations />}
    </div>
  );
};
export default ActiveAdventure;
