import { formatNumber } from "@/lib/utils/formatNumber";
import { TBikesQueryString, TStoleness } from "@/services/bikes/types";
import { TMetrics } from "@/services/metrics";

export function getTabsContent(
  queryString: TBikesQueryString,
  metrics: TMetrics
): Array<{
  text: string;
  stolennessType: TStoleness;
  queryString: TBikesQueryString;
}> {
  return [
    {
      text: `${`Stolen within ${queryString.distance} miles of ${queryString.location} (${formatNumber(metrics.proximity)})`}`,
      stolennessType: "proximity",
      queryString,
    },
    {
      text: `${`Stolen anywhere (${formatNumber(metrics.stolen)})`}`,
      stolennessType: "stolen",
      queryString,
    },
    {
      text: `${`Not marked stolen (${formatNumber(metrics.non)})`}`,
      stolennessType: "non",
      queryString,
    },
    {
      text: "All",
      stolennessType: "all",
      queryString,
    },
  ];
}
