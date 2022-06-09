import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const {
  PG_USER: user,
  PG_PASSWORD: password,
  PG_HOST: host,
  PG_DB: database,
} = process.env;

const pool = new Pool({
  user,
  password,
  database,
  host,
});

export default pool;
