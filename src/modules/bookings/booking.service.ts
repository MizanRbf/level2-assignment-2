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
const updateBooking = async (bookingId: number, body: any) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = body;
  const result = await pool.query(
    `UPDATE bookings SET customer_id = $1,
vehicle_id = $2,
rent_start_date = $3,
rent_end_date = $4,
total_price = $5,
status = $6 WHERE id = $7 RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      bookingId,
    ]
  );
  return result;
};

// Export
export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
