import fs from 'fs/promises';
/**
 * This file queries the google books API, but majorly narrows down the size
 * and complexity of the response.
 *
 * main() awaits the results of each query in the QUERIES array, and then
 * writes the json to a books.json file (for now the path is not dynamic so will
 * write to cwd)
 */

const QUERIES = [
  'history',
  'physics',
  'finance',
  'cosmology',
  'science fiction',
  'economics',
  'futurism',
  'effective altruism',
  'mathematics',
  'astronomy',
  'popular science',
  'philosophy',
  'art',
  'biology',
  'chemistry',
  'computer science',
  'earth science',
  'geography',
  'geology',
  'linguistics',
  'literature',
  'medicine',
  'music',
  'natural science',
  'psychology',
  'religion',
  'science',
  'social science',
  'theology',
  'zoology',
];

const searchBooks = async query => {
  const url = `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,subtitle,authors,publishedDate,description,pageCount,imageLinks))&q=${query}`;

  const { items } = await fetch(url).then(r => r.json());

  return items
    .filter(item => item.volumeInfo.authors)
    .map(({ id, volumeInfo }) => {
      const {
        title,
        authors,
        subtitle,
        publishedDate,
        description,
        imageLinks: { thumbnail = '' } = '',
      } = volumeInfo;
      return {
        title,
        authors,
        subtitle,
        published_date: publishedDate,
        description,
        thumbnail,
        google_books_id: id,
      };
    });
};

async function main() {
  const books = await Promise.all(QUERIES.map(searchBooks));
  const data = JSON.stringify(books, null, 2);
  await fs.writeFile('books.json', data);
}

export default main;
