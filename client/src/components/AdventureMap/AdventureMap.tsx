import "./AdventureMap.scss";
import { FC, useRef, useState } from "react";
import { useEffect } from "react";

interface Map {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

interface Marker {
  address: string;
  latitude: number;
  longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const AdventureMap: FC<Map> = ({ mapType, mapTypeControl = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<Marker>();

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

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(map, "click", (e: any) => {
        coordinateToAddress(e.latLng);
      });
    }
  };

  useEffect(initEventListener, [map]);

  const coordinateToAddress = async (coordinate: GoogleLatLng) => {
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode(
      { location: coordinate },
      function (results, status) {
        if (status === "OK") {
          setMarker({
            address: results[0].formatted_address,
            latitude: coordinate.lat(),
            longitude: coordinate.lng(),
          });
        }
      }
    );
  };

  const addSingleMarker = (): void => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
    }
  };

  useEffect(addSingleMarker, [marker]);

  const addMarker = (location: GoogleLatLng): void => {
    console.log(location);
    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      // icon: getIconAttributes("#000000"),
    });
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

  // const getIconAttributes = (iconColor: string) => {
  //   return {
  //     path: "M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z",
  //     fillColor: iconColor,
  //     fillOpacity: 0.8,
  //     strokeColor: "pink",
  //     strokeWeight: 2,
  //     anchor: new google.maps.Point(30, 50),
  //   };
  // };
  return (
    <div className='adventure-map'>
      <div ref={mapRef} className='adventure-map__map'></div>
    </div>
  );
};

export default AdventureMap;
