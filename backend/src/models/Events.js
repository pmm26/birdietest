const db = require('../util/mysql');

module.exports = class Events {
  static fetchAll() {
    return db.execute('SELECT * FROM events');
  }

  static findById(id) {
    return db.execute('SELECT * FROM events WHERE events.id = ?', [id]);
  }
};
