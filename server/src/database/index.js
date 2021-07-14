
import SqliteDB from './database.js';
import Path from 'path';
const filePath = Path.resolve(__dirname, "./redive_jp.db");

const db = new SqliteDB(filePath);

export default db