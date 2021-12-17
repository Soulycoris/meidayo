// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
import fs from 'fs-extra';

// Database.run(sql, [param, ...], [callback])
//查询所有数据 Database.all(sql, [param, ...], [callback])

class SqliteDB {
  static instance: any;
  db: sqlite3.Database;
  constructor(file: string) {
    // 单例模式
    if (!SqliteDB.instance) {
      SqliteDB.instance = this;
      if (!fs.existsSync(file)) {
        console.log('Creating db file!');
        fs.openSync(file, 'w');
      }
      this.db = new sqlite3.Database(file);
    }
    return SqliteDB.instance;
  }

  connect(file: string) {
    this.db = new sqlite3.Database(file);
  }

  printErrorInfo(err: Error) {
    console.log('Error Message:' + err.message);
  }

  createTable(sql: string) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (null != err) {
          this.printErrorInfo(err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
  // tilesData format; [[level, column, row, content], [level, column, row, content]]
  insertData(sql: string, objects: any[]) {
    var stmt = this.db.prepare(sql);
    for (var i = 0; i < objects.length; ++i) {
      stmt.run(objects[i]);
    }
    stmt.finalize();
  }

  queryData(sql: string, params = {}) {
    return new Promise((resolve) => {
      this.db.all(sql, params, (err, rows) => {
        if (null != err) {
          this.printErrorInfo(err);
          resolve([]);
        }
        resolve(rows);
      });
    });
  }

  executeSql(sql: string) {
    return new Promise((resolve) => {
      this.db.run(sql, (err) => {
        if (null != err) {
          this.printErrorInfo(err);
          resolve([]);
        }
        resolve(true);
      });
    });
  }

  close() {
    this.db.close();
  }

  static getInstance(file: string) {
    if (!this.instance) {
      return (this.instance = new SqliteDB(file));
    }
    return this.instance;
  }
}
export default SqliteDB;
