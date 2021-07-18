const db = require('../util/mysql');

module.exports = class Events {
  static async fetchAll({ filter = {}, page = 1, per_page = 25, order = 'DESC' }) {
    // Not the cleanest implementation but it does the job
    // If I were to do it again I would have used squelize 
    try {
      let sqlQuery = "SELECT * FROM events"
      let filerKeys
      // WHERE
      if (filter && (filerKeys = Object.keys(filter)).length != 0) {
        sqlQuery += ` WHERE (${filerKeys.join(' = ? AND ')} = ? )`
      }

      // Order and Pagination
      sqlQuery += ` ORDER BY timestamp ${order} LIMIT ?,?`

      const valuesArray = [
        ...(filter ? Object.values(filter) : []), // Add the values for the where
        (page - 1) * per_page,
        per_page
      ]

      const rawEvents = await db.execute(sqlQuery, valuesArray);

      return rawEvents[0].map((e) => e.payload);
    } catch (err) {
      console.log(err)
    }
  }

  static findById(id) {
    return db.execute('SELECT * FROM events WHERE events.id = ?', [id]);
  }
};
