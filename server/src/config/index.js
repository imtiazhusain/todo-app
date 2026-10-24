import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// this file is src/config/index.js → go up two levels to project root
const projectRoot = path.resolve(__dirname, "..", "..");

// decide which env file to load
const MODE = (process.env.NODE_ENV || "prod").trim();
const envPath = path.join(projectRoot, MODE === "development" ? ".env.dev" : ".env");

// load env
dotenv.config({ path: envPath });

// export named vars
export const {
  PORT,
  DEBUG_MODE,
  MONGODB_URI,
  FRONTEND_URL,
  APP_NAME,
  GEO_URL,
  FORECAST_URL

  
} = process.env;





export const NODE_ENV = MODE;
