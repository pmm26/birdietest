const db = require('../util/mysql');
// import { OkPacket, RowDataPacket } from "mysql2";

// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

interface QueryFetchAll {
  filter: object;
  dates: object;
  page: number;
  per_page: number;
  order: 'DESC' | 'ASC'
}

module.exports = class Events {
  static async fetchAll({ dates = {}, filter = {}, page = 1, per_page = 25, order = 'DESC' }: QueryFetchAll) {
    // Not the cleanest implementation but it does the job
    // If I were to do it again I would have used squelize 
    // Fetch Events
    let sqlQuery = "SELECT SQL_CALC_FOUND_ROWS payload FROM events"

    let filerKeys = Object.keys(filter)

    // Do we have Filter
    const filterEntries = filerKeys.length != 0
    const dateEntries = Object.keys(dates).length != 0

    // WHERE
    if (filterEntries || dateEntries) {
      sqlQuery += " WHERE ("

      if (filterEntries) {
        sqlQuery += `${filerKeys.join(' = ? AND ')} = ?`
      }
      if (dateEntries) {
        sqlQuery += ` timestamp >= ? AND timestamp < ? `
      }

      sqlQuery += ')'
    }

    // Order and Limit results
    // TODO: fix order
    sqlQuery += ` ORDER BY timestamp ${order} LIMIT ?,?; `
    console.log(sqlQuery)
    console.log(order)
    const valuesArray = [
      ...(filterEntries ? Object.values(filter) : []), // Add the values for the where
      ...(dateEntries ? Object.values(dates) : []),
      // order,
      (page - 1) * per_page,
      per_page
    ]

    console.log(valuesArray)

    const rawEvents = await db.execute(sqlQuery, valuesArray);
    // counting rows for pagination
    const rowCount = await db.execute('SELECT FOUND_ROWS() as row_count');

    return {
      data: rawEvents[0].map((e: { payload: object }) => e.payload),
      max_pages: Math.ceil((rowCount[0][0].row_count / per_page))
    }
  }
};
