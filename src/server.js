import express, { json, urlencoded } from 'express';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello world, this is the books api!' });
});

export default app;
