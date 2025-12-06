import { pool } from "../../config/db";

// Create Bookings
const createBooking = async (bookingsInfo: any) => {
  const { rent_start_date, rent_end_date, total_price, status } = bookingsInfo;
  const result = await pool.query(
    `INSERT INTO bookings(rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4) RETURNING *`,
    [rent_start_date, rent_end_date, total_price, status]
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

// Delete Bookings
const deleteBooking = async () => {
  const result = await pool.query(``);
  return result;
};

// Export
export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
