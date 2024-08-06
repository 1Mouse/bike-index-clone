"use client";

import { useState } from "react";

import { useRouter } from "next-nprogress-bar";

import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

import { TBikesQueryString } from "@/services/bikes/types";
import { Button } from "@/ui/atoms/button";
import { Label } from "@/ui/atoms/label";
import { NumericInput } from "@/ui/atoms/numeric-input";

export type PaginationProps = {
  queryString: TBikesQueryString;
  meta: {
    total: string;
    per_page: string;
  };
};

export function Pagination({ meta, queryString }: PaginationProps) {
  const [goToPage, setGoToPage] = useState<number>();
  const router = useRouter();
  const total = parseInt(meta.total);
  console.log("total", total);
  const perPage = parseInt(meta.per_page);
  console.log("perPage", perPage);
  const numberOfPages = Math.ceil(total / perPage);
  const page = parseInt(queryString.page);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePageChange("goTo");
  };

  const handlePageChange = (mode: "next" | "prev" | "goTo") => {
    const newParams = new URLSearchParams({
      ...queryString,
      page: getDestinationPage(mode).toString(),
    });
    router.push(`?${newParams.toString()}`);
  };

  const getDestinationPage = (mode: "next" | "prev" | "goTo") => {
    if (mode === "next") return page + 1;
    if (mode === "prev") return page - 1;
    return goToPage!;
  };

  return (
    <>
      <div className='my-8 mb-10 flex flex-wrap items-center justify-end gap-4'>
        <Button
          aria-label='previous page'
          type='button'
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          variant='outline'
          className='min-w-0 rounded-full'
        >
          <MoveLeftIcon />
        </Button>
        <span>
          Page {page} of {numberOfPages}
        </span>
        <Button
          aria-label='next page'
          type='button'
          onClick={() => handlePageChange("next")}
          disabled={page === numberOfPages}
          variant='outline'
          className='min-w-0 rounded-full'
        >
          <MoveRightIcon />
        </Button>
        <form className='flex items-center max-sm:mb-2' onSubmit={handleSubmit}>
          <Label>Go to page</Label>
          <NumericInput
            aria-label='enter page number to go to'
            decimalScale={0}
            allowNegative={false}
            inputMode='numeric'
            autoComplete='off'
            className='mx-2 h-10 w-24 px-3'
            isAllowed={values => {
              const { floatValue } = values;
              console.log(values);
              // to handle the case of empty input
              if (floatValue === undefined) return true;
              return floatValue <= numberOfPages && floatValue > 0;
            }}
            onChange={e => setGoToPage(parseInt(e.target.value))}
          />
          <Button
            type='submit'
            disabled={!goToPage}
            aria-labelledby='go-to-page'
          >
            Go
          </Button>
        </form>
      </div>
    </>
  );
}
