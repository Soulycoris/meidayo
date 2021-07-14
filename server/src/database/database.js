const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
// Database.run(sql, [param, ...], [callback])
//查询所有数据 Database.all(sql, [param, ...], [callback])

class SqliteDB {
  constructor(file) {
    // 单例模式
    if (!SqliteDB.instance) {
      SqliteDB.instance = this;
      this.db = new sqlite3.Database(file);
      if (!fs.existsSync(file)) {
        console.log('Creating db file!');
        fs.openSync(file, 'w');
      }
    }

    return SqliteDB.instance;
  }

  connect(file){
    this.db = new sqlite3.Database(file);
  }

  printErrorInfo(err) {
    console.log('Error Message:' + err.message);
  }

  createTable(sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (null != err) {
          this.printErrorInfo(err);
          reject(err);
        }
        resolve();
      });
    });
  }

  insertData(sql, objects) {
    var stmt = this.db.prepare(sql);
    for (var i = 0; i < objects.length; ++i) {
      stmt.run(objects[i]);
    }

    stmt.finalize();
  }

  queryData(sql, params = {}) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (null != err) {
          this.printErrorInfo(err);
          reject(null);
        }
        resolve(rows);
      });
    });
  }

  executeSql(sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (null != err) {
          this.printErrorInfo(err);
          reject(null);
        }
        resolve();
      });
    });
  }

  close() {
    this.db.close();
  }

  static getInstance(file) {
    if (!this.instance) {
      return (this.instance = new SqliteDB(file));
    }
    return this.instance;
  }
}
module.exports = SqliteDB;
// export default SqliteDB;
