import "./LocationCard.scss";
import { FC } from "react";

interface Location {
  location: {
    abbrv_province: string;
    adventure_id: number;
    city: string;
    coords: string;
    country: string;
    full_address: string;
    id: number;
    place_id: string;
  };
}

const LocationCard: FC<Location> = ({ location }) => {
  return (
    <div>
      <h1>{location.full_address}</h1>
    </div>
  );
};

export default LocationCard;
