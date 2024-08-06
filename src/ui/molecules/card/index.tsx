"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import { getOrdinalSuffix } from "@/lib/utils/getOrdinalSuffix";
import { TBike } from "@/services/bikes/bike.schema";

export type CardProps = {
  bikeData: TBike;
};

export function Card({ bikeData }: CardProps) {
  const [stolenDate, setStolenDate] = useState<string>("");
  useEffect(() => {
    if (!bikeData.date_stolen) return;
    const date = new Date(bikeData.date_stolen);
    const timeZonedDate = new Intl.DateTimeFormat("en-Us", {
      month: "short",
      day: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).formatToParts(date);
    const month = timeZonedDate.find(part => part.type === "month")?.value;
    const day = timeZonedDate.find(part => part.type === "day")?.value;

    if (month === undefined || day === undefined) return;

    setStolenDate(`${month} ${day}${getOrdinalSuffix(parseInt(day))}`);
  }, [bikeData.date_stolen]);

  return (
    <>
      <div className='my-5 grid grid-cols-1 rounded-xl bg-blue-200 shadow-lg drop-shadow-lg sm:grid-cols-[300px_auto]'>
        <Link href={`/bikes/${bikeData.id}`} prefetch={false}>
          <Image
            priority={false}
            src={bikeData.thumb || "bike-placeholder.svg"}
            alt={bikeData.title}
            width={300}
            height={300}
            className={cn(
              !bikeData.thumb && "bg-slate-400",
              "block rounded-xl bg-slate-400 object-contain max-sm:max-h-40 max-sm:w-full max-sm:rounded-b-none sm:rounded-e-none"
            )}
          />
        </Link>
        <div className='p-5'>
          <h2 className='mb-4 text-lg font-medium'>
            <Link
              href={`/bikes/${bikeData.id}`}
              className='text-black hover:underline'
              prefetch={false}
            >
              {bikeData.title}
            </Link>
          </h2>
          <section className='grid grid-rows-3 gap-3'>
            <p>
              <strong>Serial: </strong>
              {bikeData.serial}
            </p>
            <p>
              <strong>Primary Color: </strong>
              {bikeData.frame_colors.join(" - ")}
            </p>
            {bikeData.description ? (
              <p>
                <strong>Description: </strong>
                {bikeData.description}
              </p>
            ) : null}
            {bikeData.stolen ? (
              <p>
                <strong className='text-red-600'>Stolen: </strong>
                {stolenDate}
              </p>
            ) : null}

            {bikeData.stolen_location && bikeData.stolen ? (
              <p>
                <strong>Location: </strong>
                {bikeData.stolen_location}
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
}
