const db = require('../util/mysql');

module.exports = class Events {
  static async fetchAll(query) {
    try {
    const page = query.page || 1;
    const per_page = query.per_page || 25;

    let sqlQuery = "SELECT * FROM events"
    
    const filter = query.filter
    let filerKeys;
    if (filter && (filerKeys = Object.keys(filter)).length != 0) {
      sqlQuery += ` WHERE (${filerKeys.join(' = ? AND ')} = ? )`
    }

    sqlQuery += " ORDER BY timestamp DESC LIMIT ?,?"

    console.log(sqlQuery)

    const valuesArray =  [
      ...(filter ? Object.values(filter) : []), 
      (page-1)*per_page, per_page]


    console.log(valuesArray)
    const rawEvents = await db.execute(sqlQuery, valuesArray);

    return rawEvents[0].map((e) => e.payload);
    } catch(err) {
      console.log(err)
    }
  }

  static findById(id) {
    return db.execute('SELECT * FROM events WHERE events.id = ?', [id]);
  }

  // static findBy() {
  //   const mac = req.query.mac; 
  //   const macArr = mac.split(',');
  //   var sql =  mysql.format("SELECT * FROM user_email WHERE macId IN (?)", macArr);
  //   db.execute(sql, function(err, row) ...{ ... .. }
  // }
};
