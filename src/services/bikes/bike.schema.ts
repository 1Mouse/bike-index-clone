import { z } from "zod";

export const bikeSchema = z.object({
  title: z.string(),
  date_stolen: z.number().nullable(),
  description: z.string().nullable(),
  stolen_location: z.string().nullable(),
  large_img: z.string().nullable(),
  stolen: z.boolean(),
  serial: z.string(),
  thumb: z.string().nullable(),
  url: z.string(),
  frame_colors: z.array(z.string()),
  id: z.number(),
  // frame_model: z.string(),
  // is_stock_img: z.boolean(),
  // location_found: z.null(),
  // manufacturer_name: z.string(),
  // external_id: z.null(),
  // registry_name: z.null(),
  // registry_url: z.null(),
  // status: z.string(),
  // stolen_coordinates: z.null(),
  // year: z.number(),
  // propulsion_type_slug: z.string(),
  // cycle_type_slug: z.string()
});

export type TBike = z.infer<typeof bikeSchema>;
