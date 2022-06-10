/**
 * Here we have a naive transformation function that takes a json object
 * of the shape that was pulled from google books api, and converts it
 * to and INSERT INTO table sql command.
 */
/* eslint-disable no-restricted-syntax */
function jsonToSql(v) {
  const data = Object.entries(v);

  const columns = data.map(x => x[0]);
  const rows = data.map(x => x[1]);

  // sql start
  let sql = 'INSERT INTO books (\n  ';

  for (const col of columns) {
    sql += `${col},\n  `;
  }

  // remove trailing comma and prep for...
  sql = `${sql.slice(0, -4)}\n) VALUES (\n  `;

  for (const r of rows) {
    sql += `'${r}',\n  `;
  }

  sql = `${sql.slice(0, -4)}\n);`;

  return sql;
}

export default jsonToSql;
