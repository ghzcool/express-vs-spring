import {AutowireComponent} from '@ppirogov/express-decorators';
import {Record} from '../models/Record';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'spring_vs_node',
  connectionLimit: 5,
  password: process.env.DB_PASSWORD ?? 'spring_vs_node'
});

export interface RecordRepositoryInterface {
  getRecords: () => Promise<Record[]>;
  insertRecord: (record: Record) => Promise<Record>;
}

@AutowireComponent
export class RecordRepository {
  async getRecords(): Promise<Record[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      return await conn.query('SELECT * from spring_vs_node.record order by id DESC limit 10');
    } finally {
      if (conn) conn.release();
    }
  }

  async insertRecord({name, description}: Record): Promise<Record> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(`INSERT INTO spring_vs_node.record (name, description, created_date)
                        VALUES ('${name}', '${description}', NOW());`);
      const records = await conn.query('SELECT * FROM spring_vs_node.record ORDER BY id DESC LIMIT 1');
      return records[0];
    } finally {
      if (conn) conn.release();
    }
  }
}
