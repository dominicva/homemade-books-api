import express, { json, urlencoded } from 'express';
import db from './db.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/books', async (req, res) => {
  const sql = 'select * from books';
  const result = await db.query(sql);
  res.json({ data: result.rows });
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM books WHERE book_id = $1';

  const { rows } = await db.query(sql, [id]);

  res.send({ data: rows });
});

export default app;
