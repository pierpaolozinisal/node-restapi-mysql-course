import { createPool } from "mysql2/promise";
import {
  DB_database,
  DB_host,
  DB_password,
  DB_port,
  DB_user,
} from "./config.js";

export const pool = createPool({
  host: DB_host,
  port: DB_port,
  user: DB_user,
  password: DB_password,
  database: DB_database,
});
