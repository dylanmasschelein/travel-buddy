import "./AdventureMap.scss";
import { FC, useRef, useState } from "react";
import { useEffect } from "react";

interface Map {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const AdventureMap: FC<Map> = ({ mapType, mapTypeControl = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();

  const startMap = () => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [map]);

  const defaultMapStart = () => {
    const defaultCenter = new google.maps.LatLng(12, -75);
    initMap(5, defaultCenter);
  };

  const initMap = (zoom: number, center: GoogleLatLng) => {
    if (mapRef.current) {
      setMap(
        new google.maps.Map(mapRef.current, {
          zoom,
          center,
          mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId: mapType,
        })
      );
    }
  };

  return (
    <div className='adventure-map'>
      <div ref={mapRef} className='adventure-map__map'></div>
      Mappppping
    </div>
  );
};

export default AdventureMap;

// import "./AdventureMap.scss";
// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
// import { isPropertyAccessChain } from "typescript";

// export const WrappedMap = withScriptjs(withGoogleMap(Map));
// const AdventureMap: React.FC = () => {
//   return (
//     <WrappedMap
//     googleMapURL={process.env.}
//     >
//       <GoogleMap
//         defaultZoom={10}
//         defaultCenter={{ lat: 45.4234, lng: -75.2342 }}
//       />
//     </WrappedMap>
//   );
// };

// export default AdventureMap;
