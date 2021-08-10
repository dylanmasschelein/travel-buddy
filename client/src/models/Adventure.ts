export default interface Adventure {
  title: string;
  country: string;
  length_of_stay: number;
  photo: string;
}

export interface ActiveAdv {
  title: string;
  country: string;
  length_of_stay: number;
  img: any;
  id: number;
}

export interface Coords {
  id: number;
  coords: {
    lat: number;
    lng: number;
  };
}
