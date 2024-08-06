const env = process?.env?.NODE_ENV || "development";
export const isProduction = env === "production";