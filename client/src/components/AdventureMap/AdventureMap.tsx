import "./AdventureMap.scss";
import { FC, useRef, useState } from "react";
import { useEffect } from "react";
import ActiveAdventure from "../ActiveAdventure";
import axios from "axios";
import pinIcon from "../../assets/images/tack.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Coords } from "../../models/Adventure";

interface Map {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  coords: Coords[];
  adventureId: number;
  setData: (d: object) => void;
  getClickedLocation: (d: number) => void;
  addLocation: () => void;
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
  adventureId,
  addLocation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<Marker>();
  const [search, setSearch] = useState<string>("");

  const searchPlaces = async () => {
    console.log(search);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${search}&inputtype=textquery&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const startMap = () => {
    if (!map) {
      defaultMapStart(); // initial center stored in db later
    }
  };

  useEffect(() => {
    startMap();
    plotInitialMarkers();
    if (map) initAutocomplete();
  }, [map, coords]);

  const defaultMapStart = () => {
    const defaultCenter = new google.maps.LatLng(-33.865143, 151.208755);
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
            adventure_id: adventureId,
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

  const initAutocomplete = () => {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("search") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old mfarkers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
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
      <input
        type='text'
        id='search'
        className='adventure-map__search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FontAwesomeIcon
        onClick={() => addLocation()}
        className='adventure-map__icon'
        icon={faPlusSquare}
      />
      <div ref={mapRef} className='adventure-map__map'></div>
    </div>
  );
};

export default AdventureMap;
