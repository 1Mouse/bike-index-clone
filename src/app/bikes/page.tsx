import { notFound } from "next/navigation";

import { BikesService } from "@/services/bikes/calls";
import { TBikesQueryString, TStoleness } from "@/services/bikes/types";
import { getMetrics } from "@/services/metrics";
import { Card } from "@/ui/molecules/card";
import { Hero } from "@/ui/molecules/hero";
import { Pagination, PaginationProps } from "@/ui/molecules/pagination";
import { SearchAndFilterSection } from "@/ui/molecules/search-and-filter-section";

const isStolnessCorrect = (value: string): value is TStoleness => {
  return ["stolen", "non", "all", "proximity"].includes(value);
};

const isDistanceCorrect = (value: string) => {
  return !isNaN(parseInt(value)) && parseInt(value) > 0;
};

const isLocationCorrect = (value: string | undefined) => {
  return (
    value !== undefined &&
    typeof value === "string" &&
    value !== "" &&
    value.length > 0
  );
};

export default async function Home(props: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log("props", props);
  const { searchParams } = props;
  if (
    (searchParams.stolenness && !isStolnessCorrect(searchParams.stolenness)) ||
    (searchParams.distance && !isDistanceCorrect(searchParams.distance))
  ) {
    return notFound();
  }

  const queryString: TBikesQueryString = {
    page: searchParams.page || "1",
    per_page: searchParams.per_page || "10",
    query: searchParams.query || "",
    distance: searchParams.distance || "100",
    stolenness: (searchParams.stolenness as TStoleness) || "stolen",
    location: isLocationCorrect(searchParams.location)
      ? (searchParams.location as string)
      : "Munich",
  };
  console.log("queryString wtf", queryString);
  const { data, meta } = await BikesService.getPaginated(queryString);
  const metrics = await getMetrics({
    distance: queryString.distance,
    location: queryString.location,
  });

  // console.log("data", data);
  console.log("metrics", metrics);

  if (!metrics) throw new Error("metrics not found");

  const isEmptyState = data && data.length === 0;
  return (
    <>
      <Hero />
      <SearchAndFilterSection metrics={metrics} queryString={queryString} />
      {isEmptyState ? (
        <div className='mt-16 text-center'>
          <h1 className='text-2xl font-bold'>No Bikes Found</h1>
          <p className='text-sm text-gray-500'>
            Sorry, we couldn&apos;t find any bikes matching your search
            criteria.
          </p>
        </div>
      ) : null}
      {data?.map(bike => <Card key={bike.id} bikeData={bike} />)}
      {meta?.total && meta?.per_page && !isEmptyState ? (
        <Pagination
          meta={meta as PaginationProps["meta"]}
          queryString={queryString}
        />
      ) : null}
    </>
  );
}
