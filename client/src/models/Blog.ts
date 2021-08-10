export interface Blog {
  title: string;
  body: string;
  location_id: number;
  id: number;
}

export interface ActivePost {
  title: string;
  timestamp: Date;
  author: string;
  article: string;
  likes: number;
}
