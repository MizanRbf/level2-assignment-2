import { pool } from "../../config/db";

const createBooking = async () => {
  const result = await pool.query(`INSERT INTO bookings`);
  return result;
};
