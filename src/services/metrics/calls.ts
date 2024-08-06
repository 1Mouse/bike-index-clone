import { API_URL } from "@/lib/constants";
import { ResponseError } from "@/lib/utils/responseError";
import { validateSchema } from "@/lib/utils/validateSchema";

import { metricsSchema } from "./metrics.schema";
import { TMetricsQueryString } from "./types";

export async function getMetrics({ distance, location }: TMetricsQueryString) {
  const res = await fetch(
    `${API_URL}/search/count?location=${location}&distance=${distance}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
      },
    }
  );
  const jsonRes = await res.json();

  if (!res.ok) {
    throw new ResponseError({
      message: `HTTP error! status: ${res.status}`,
      response: res,
      status: res.status,
      responseJSON: jsonRes,
    });
  }

  console.log("jsonRes metrics", jsonRes);
  console.log("res metrics", res);
  return validateSchema(metricsSchema, jsonRes);
}
