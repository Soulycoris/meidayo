import SqliteDB from './database';
import Path from 'path';
const filePath = Path.resolve(__dirname, './idolypride.db');

const db = new SqliteDB(filePath);

export default db;
