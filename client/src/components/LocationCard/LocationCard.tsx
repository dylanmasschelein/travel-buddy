import "./LocationCard.scss";
import { FC } from "react";
import Blog from "../Blog";
import { Location } from "../../models/Location";
interface Blog {
  title: string;
  body: string;
  location_id: number;
  id: number;
}
interface LocationProps {
  location: Location[];
  user: { name: string; email: string; id: number };
  blogs: Blog[];
}

const LocationCard: FC<LocationProps> = ({ blogs, user, location }) => {
  return (
    <div className='location'>
      {/* <h1 className='location__place'>{location[0].place_id}</h1> */}
      <h2 className='location__city'>
        {location[0].city},&nbsp;{location[0].country}
      </h2>
      <Blog blogs={blogs} user={user} location={location} />
    </div>
  );
};

export default LocationCard;
