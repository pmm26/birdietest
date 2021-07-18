const db = require('../util/mysql');

module.exports = class Events {
  static async fetchAll({ filter = {}, page = 1, per_page = 25, order = 'DESC' }) {
    // Not the cleanest implementation but it does the job
    // If I were to do it again I would have used squelize 
    try {
      // Fetch Events
      let sqlQuery = "SELECT SQL_CALC_FOUND_ROWS payload FROM events"

      let filerKeys
      // WHERE
      if (filter && (filerKeys = Object.keys(filter)).length != 0) {
        const where = ` WHERE (${filerKeys.join(' = ? AND ')} = ? )`
        sqlQuery += where
      }

      // Order and Pagination
      sqlQuery += ` ORDER BY timestamp ${order} LIMIT ?,?; `
      const valuesArray = [
        ...(filter ? Object.values(filter) : []), // Add the values for the where
        (page - 1) * per_page,
        per_page
      ]

      const rawEvents = await db.execute(sqlQuery, valuesArray);
      // counting rows for pagination
      const rowCount = await db.execute('SELECT FOUND_ROWS() as row_count');

      return {
        data: rawEvents[0].map((e) => e.payload),
        max_pages: Math.ceil((rowCount[0][0].row_count / per_page))
      }
    } catch (err) {
      console.log(err)
    }
  }

  static findById(id) {
    return db.execute('SELECT * FROM events WHERE events.id = ?', [id]);
  }
};
