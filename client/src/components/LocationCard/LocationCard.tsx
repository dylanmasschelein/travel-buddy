import "./LocationCard.scss";
import { FC } from "react";
import Blog from "../Blog";
import { Location } from "../../models/Location";

interface LocationProps {
  location: Location[];
  user: { name: string; email: string; id: number };
}

const LocationCard: FC<LocationProps> = ({ user, location }) => {
  return (
    <div className='location'>
      <h1 className='location__place'>{location[0].place_id}</h1>
      <h2 className='location__city'>
        {location[0].city},&nbsp;{location[0].country}
      </h2>

      <Blog user={user} location={location} />
      <p>Photos</p>
      <p>blog/diary/memories</p>
      <p>Recommendations</p>
    </div>
  );
};

export default LocationCard;
