import { z } from "zod";

export const metricsSchema = z.object({
  proximity: z.number(),
  stolen: z.number(),
  non: z.number(),
});

export type TMetrics = z.infer<typeof metricsSchema>;
