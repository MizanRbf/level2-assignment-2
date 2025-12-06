import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

// Init DB
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone INT NOT NULL,
    role TEXT NOT NULL
    )
    `);
  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name TEXT NOT NULL,
      type TEXT,
      registration_number INT UNIQUE NOT NULL,
      daily_rent_price INT NOT NULL,
      availability_status BOOLEAN
      )
      `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id),
        vehicle_id INT REFERENCES vehicles(id),
        rent_start_date TEXT NOT NULL,
        rent_end_date TEXT NOT NULL,
        total_price INT NOT NULL,
        status BOOLEAN
        )
        `);
};
export default initDB;
