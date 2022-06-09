import express, { json, urlencoded } from 'express';
import db from './db/index.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const sql = 'select * from books';
  const result = await db.query(sql);
  res.json({ data: result.rows });
});

export default app;
