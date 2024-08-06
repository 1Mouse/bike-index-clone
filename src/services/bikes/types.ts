export type TStoleness = "stolen" | "non" | "proximity" | "all";

export type TBikesQueryString = {
  page: string;
  per_page: string;
  query: string;
  location: string;
  distance: string;
  stolenness: TStoleness;
};
