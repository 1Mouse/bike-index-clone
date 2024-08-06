import { z } from "zod";
import { isProduction } from "./isProduction";



/**
 * Validates the response against the provided schema
 * @param schema - the schema to validate the response against
 * @param data - the response to be validated
 * @returns the validated response if it's valid,
 * if in production, it returns the response as is and logs the error
 * if in development, it logs the error and returns undefined
 */
export function validateSchema<T>(
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    data: unknown
): T | undefined {
    try {
        if (isProduction) {
            const parsed = schema.safeParse(data);
            if (parsed.success) return parsed.data;
            console.error("The response is invalid", parsed.error);
            return data as T;
        }

        return schema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("The response is invalid", error.errors);
            return;
        }

        console.error(
            "Uncaught error occurred while validating response with zod",
            error
        );
    }
}
