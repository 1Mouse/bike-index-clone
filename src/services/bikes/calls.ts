import { z } from "zod";

import { API_URL } from "@/lib/constants";
import { ResponseError } from "@/lib/utils/responseError";
import { validateSchema } from "@/lib/utils/validateSchema";

import { bikeSchema } from "./bike.schema";
import { TBikesQueryString } from "./types";

export const BikesService = {
  getPaginated: async ({
    page,
    per_page,
    distance,
    location,
    stolenness,
  }: TBikesQueryString) => {
    const res = await fetch(
      `${API_URL}/search?page=${page}&per_page=${per_page}&location=${location}&distance=${distance}&stolenness=${stolenness}`,
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

    console.log("jsonRes bikes", jsonRes);
    console.log("res bikes", res, { depth: 10 });

    return {
      data: validateSchema(z.array(bikeSchema), jsonRes.bikes),
      meta: {
        total: res.headers.get("Total"),
        per_page: res.headers.get("Per-Page"),
      },
    };
  },
};
