import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//connection to the MySQL server in the loaclhost.
// CREATE YOUR OWN .env FILE AND STORE THE VALUES FOR CONNECTION TO OUR LOCAL HOST

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//Query to extract all the records from the database table
export async function getRecords() {
    const result = await pool.query("SELECT * FROM users")
    return result[0];
}

//Query to extract one record from the database table by using its unique id
export async function getRecord(id) {
    const trueid = await checkRecordExists(id);
    if(trueid) {
        const [result] = await pool.query(`
        SELECT *
        FROM users
        WHERE id = ?
        `, [id])
        return result[0]
    }
    else {
        throw new Error('No such record')
    }
}

//Query to add a new record to the database table
export async function createRecord(user_name, email, phone) {
    const result = await pool.query(`
    INSERT INTO users (user_name, email, phone)
    VALUES (?,?,?)
    `, [user_name, email, phone])
    const newRecord = result[0].insertId;
    const newUser = getRecord(newRecord);
    return newUser;
}

//Query to delete one record from the database table by using its unique id
export async function deleteRecord(id) {
    const trueid = await checkRecordExists(id)
    if (trueid) {
        const result = await pool.query(`
        DELETE from users
        WHERE id = ?
        `, [id])
    return result
    } else {
        throw new Error('No such record')
    }
}

//Query to update one record from the database table by using its unique id
export async function upadteRecord(user_name, email, phone, id) {
    const trueid = await checkRecordExists(id)
    if (trueid) {
        const result = await pool.query(`
        UPDATE users
        SET user_name = ?, email = ?, phone = ?
        WHERE id = ?
        `, [user_name, email, phone, id])
        const updatedRecord = getRecord(id)
        return updatedRecord;
    } else {
        throw new Error('No such Record')
    }
}

//function to check if the given id exist in the database
async function checkRecordExists(id) {
    const [result] = await pool.query(
      `
      SELECT COUNT(*) as count
      FROM users
      WHERE id = ?
      `,
      [id]
    );
  
    const count = result[0].count;
  
    return count > 0;
  }
