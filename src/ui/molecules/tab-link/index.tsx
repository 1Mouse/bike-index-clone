import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import { TBikesQueryString, TStoleness } from "@/services/bikes/types";

export function TabLink({
  queryString,
  text,
  stolennessType,
}: {
  queryString: TBikesQueryString;
  text: string;
  stolennessType: TStoleness;
}) {
  return (
    <Link
      href={`/bikes?${new URLSearchParams({ ...queryString, page: "1", stolenness: stolennessType } satisfies TBikesQueryString).toString()}`}
      className={cn(
        "block w-full bg-white px-4 py-4 text-center text-sm text-black sm:col-span-3",
        queryString.stolenness === stolennessType && "bg-black text-white",
        queryString.stolenness !== stolennessType &&
          "hover:bg-black/60 hover:text-white"
      )}
    >
      {text}
    </Link>
  );
}
