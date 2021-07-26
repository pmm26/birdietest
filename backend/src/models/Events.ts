const db = require("../util/mysql");

interface Dates {
  start_date?: string;
  end_date?: string;
}

interface QueryFetchAll {
  filter: object;
  dates: Dates;
  page: number;
  per_page: number;
  order: "DESC" | "ASC";
}

module.exports = class Events { 

  static async fetchAll({
    dates = {},
    filter = {},
    page = 1,
    per_page = 25,
    order = "DESC"
  }: QueryFetchAll) {
    // Not the cleanest implementation but it does the job
    // If I were to do it again I would have used squelize
    // Fetch Events
    let sqlQuery = "SELECT SQL_CALC_FOUND_ROWS payload FROM events";

    let filerKeys = Object.keys(filter);

    // Do we have Filter
    const filterEntries = filerKeys.length > 0;
    const dateEntries = Object.keys(dates).length > 0;

    // WHERE
    if (filterEntries || dateEntries) {
      sqlQuery += " WHERE (";

      if (filterEntries) {
        sqlQuery += `${filerKeys.join(" = ? AND ")} = ?`;
        // Adding the and
        if (dateEntries) {
          sqlQuery += " AND ";
        }
      }

      // Start Date
      if (dates.start_date) {
        sqlQuery += ` DATE(timestamp) >= ? `;
      }

      // End Date
      if (dates.end_date) {
        sqlQuery += ` AND DATE(timestamp) < ? `;
      }

      sqlQuery += ")";
    }

    // Order and Limit results
    // TODO: FIX SQL INJECTION
    sqlQuery += ` ORDER BY timestamp ${order} LIMIT ?,?; `;

    const valuesArray = [
      ...(filterEntries ? Object.values(filter) : []), // Add the values for the where
      ...(dates.start_date ? [dates.start_date] : []),
      ...(dates.end_date ? [dates.end_date] : []),
      // order,
      (page - 1) * per_page,
      per_page,
    ];

    const rawEvents = await db.execute(sqlQuery, valuesArray);
    // counting rows for pagination
    const rowCount = await db.execute("SELECT FOUND_ROWS() as row_count");

    return {
      data: rawEvents[0].map((e: { payload: object }) => e.payload),
      row_count: rowCount[0][0].row_count,
      max_pages: Math.ceil(rowCount[0][0].row_count / per_page),
      page: +page, //convert to number
    };
  }
};
