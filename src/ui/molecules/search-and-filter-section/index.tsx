"use client";

import { useEffect } from "react";

import { useRouter } from "next-nprogress-bar";

import { cn } from "@/lib/utils/cn";
import { TBikesQueryString } from "@/services/bikes/types";
import { TMetrics } from "@/services/metrics";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Label } from "@/ui/atoms/label";
import { NumericInput } from "@/ui/atoms/numeric-input";

import { TabLink } from "../tab-link";
import { getTabsContent } from "./helpers";

type SearchAndFilterSectionProps = {
  queryString: TBikesQueryString;
  metrics: TMetrics;
};

export function SearchAndFilterSection({
  queryString,
  metrics,
}: SearchAndFilterSectionProps) {
  const router = useRouter();

  console.log("queryString in search-and-filter-section", queryString);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("formData", formData.entries());
    console.log("query", formData.get("query"));
    console.log(
      "distance",
      parseInt(
        formData.get("distance")?.toString().split("miles")[0] as string
      ).toString()
    );
    console.log("location", formData.get("location"));
    const getDistance = () => {
      if (formData.get("distance")) {
        return parseInt(
          formData.get("distance")?.toString().split("miles")[0] as string
        ).toString();
      }
      return "100";
    };
    console.log("form distance", formData.get("distance"));
    console.log("sent distance", getDistance());
    const newParams = new URLSearchParams({
      ...queryString,
      query: formData.get("query") as string,
      distance: getDistance(),
      location: formData.get("location") as string,
      page: "1",
    });
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    console.log("useEffect");
    console.log("queryString", queryString);
    router.replace(`?${new URLSearchParams(queryString).toString()}`);
    const mainForm = document.getElementById(
      "search-and-filter-form"
    ) as HTMLFormElement;
    mainForm.reset();
    const distanceField = document.getElementById(
      "distance"
    ) as HTMLInputElement;
    if (!distanceField.defaultValue) distanceField.value = "100";
  }, [queryString, router]);

  const showDistanceAndLocation = () => {
    return queryString.stolenness === "proximity";
  };
  return (
    <main>
      <form id='search-and-filter-form' onSubmit={handleSubmit}>
        <section className='mx-auto max-w-2xl space-y-3'>
          <div className='flex items-center gap-5 max-sm:gap-2'>
            <Input
              aria-label='enter search query'
              id='query'
              name='query'
              type='text'
              placeholder='Search bikes'
              defaultValue={queryString.query}
            ></Input>
            <Button
              aria-label='search bikes'
              type='submit'
              variant={"default"}
              className='h-[50px] max-sm:min-w-20'
            >
              Search
            </Button>
          </div>

          <div
            className={cn(
              "flex items-center justify-start px-1 max-sm:flex-col max-sm:items-start",
              !showDistanceAndLocation() && "invisible"
            )}
          >
            <div className='flex items-center max-sm:mb-2'>
              <Label>within</Label>
              <NumericInput
                id='distance'
                name='distance'
                decimalScale={0}
                allowNegative={false}
                inputMode='numeric'
                autoComplete='off'
                suffix='  miles'
                className='mx-2 h-7 w-32 px-3'
                defaultValue={queryString.distance}
              />
            </div>
            <div className='flex items-center'>
              <Label>from</Label>
              <Input
                id='location'
                name='location'
                className='mx-2 h-7 w-48 px-3'
                type='text'
                placeholder='e.g. Munich'
                defaultValue={queryString.location}
              />
            </div>
          </div>
        </section>
        <div className='my-5 grid grid-cols-1 border border-black bg-white sm:grid-cols-12 [&>*:not(:last-child)]:border-black max-sm:[&>*:not(:last-child)]:border-b sm:[&>*:not(:last-child)]:border-e'>
          {getTabsContent(queryString, metrics).map(
            ({ text, stolennessType, queryString }) => (
              <TabLink
                key={stolennessType}
                queryString={queryString}
                text={text}
                stolennessType={stolennessType}
              />
            )
          )}
        </div>
      </form>
    </main>
  );
}
