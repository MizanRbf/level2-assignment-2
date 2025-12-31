import { pool } from "../../config/db";

// Create Bookings
const createBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // Check vehicle
  const vehicleRes = await pool.query(
    `SELECT daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleRes.rowCount === 0) throw new Error("Vehicle not found");

  if (vehicleRes.rows[0].availability_status !== "available")
    throw new Error("Vehicle already booked");

  //Calculate days
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (days <= 0) throw new Error("Invalid date range");

  //Calculate price
  const dailyPrice = Number(vehicleRes.rows[0].daily_rent_price);
  const total_price = dailyPrice * days;
  console.log(total_price);

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // update vehicle
  pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id=$1`, [
    vehicle_id,
  ]);
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
