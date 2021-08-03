import "./AdventureMap.scss";
import { FC, useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

interface Coords {
  lat: number;
  lng: number;
}

interface Map {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  coords: { id: number; coords: Coords }[];
  setData: (d: object) => void;
  getClickedLocation: (d: number) => void;
}

interface Marker {
  address: string;
  latitude: number;
  longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const AdventureMap: FC<Map> = ({
  setData,
  mapType,
  mapTypeControl = false,
  coords,
  getClickedLocation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<Marker>();

  const startMap = () => {
    if (!map) {
      defaultMapStart(); // initial center stored in db later
    }
  };

  useEffect(() => {
    startMap();
    plotInitialMarkers();
  }, [map, coords]);

  const defaultMapStart = () => {
    const defaultCenter = new google.maps.LatLng(12, -75);
    initMap(5, defaultCenter);
  };

  let mapMarker: google.maps.Marker;
  const plotInitialMarkers = () => {
    coords.forEach((coord) => {
      mapMarker = new google.maps.Marker({
        position: coord.coords,
        map,
        title: "Hi! im a marker!",
      });
      mapMarker.addListener("click", () => getClickedLocation(coord.id));
    });
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
      async function (results, status) {
        if (status === "OK") {
          const coordinates = JSON.stringify({
            lat: coordinate.lat(),
            lng: coordinate.lng(),
          });

          const data = {
            coords: coordinates,
            city: results[0].address_components[2].long_name,
            province: results[0].address_components[4].long_name,
            abbrv_province: results[0].address_components[4].short_name,
            country: results[0].address_components[5].long_name,
            full_address: results[0].formatted_address,
            place_id: results[0].place_id,
          };
          setData(data);

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
