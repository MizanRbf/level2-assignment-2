import { pool } from "../../config/db";

// Create Bookings
const createBooking = async (payload: any) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );
  return result;
};

// Get Bookings
const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

// Update Bookings
const updateBooking = async () => {
  const result = await pool.query(``);
  return result;
};

// Export
export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
