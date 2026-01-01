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

  const insertRes = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,'active') RETURNING id`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // update vehicle
  pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id=$1`, [
    vehicle_id,
  ]);

  // Add vehicle object
  const bookingId = insertRes.rows[0].id;
  const bookingRes = await pool.query(
    `SELECT b.id, b.customer_id, b.vehicle_id,TO_CHAR(b.rent_start_date,'YYYY-MM-DD') AS rent_start_date,TO_CHAR(b.rent_end_date,'YYYY-MM-DD') AS rent_end_date,b.total_price,b.status,json_build_object(
    'vehicle_name', v.vehicle_name,
    'daily_rent_price',v.daily_rent_price
    ) AS vehicle FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE b.id = $1`,
    [bookingId]
  );

  return bookingRes;
};

// Get Bookings
const getBookings = async (role: string, id: number) => {
  if (role === "admin") {
    const result = await pool.query(
      `SELECT b.id,b.customer_id,b.vehicle_id,TO_CHAR(b.rent_start_date,'YYYY-MM-DD') AS rent_start_date, TO_CHAR(b.rent_end_date,'YYYY-MM-DD') AS rent_end_date,b.total_price,b.status, json_build_object('name',u.name,'email',u.email) AS customer, json_build_object('vehicle_name',v.vehicle_name,'registration_number',v.registration_number) AS vehicle FROM bookings b JOIN users u ON b.customer_id = u.id JOIN vehicles v ON b.vehicle_id = v.id`
    );
    return result;
  } else {
    const result = await pool.query(
      `SELECT b.id,b.vehicle_id,TO_CHAR(b.rent_start_date,'YYYY-MM-DD') AS rent_start_date, TO_CHAR(b.rent_end_date,'YYYY-MM-DD') AS rent_end_date,b.total_price,b.status, json_build_object('vehicle_name',v.vehicle_name, 'registration_number',v.registration_number,'type',v.type) AS vehicle FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE b.customer_id = $1`,
      [id]
    );
    return result;
  }
};

// Update Bookings
const updateBooking = async (
  bookingId: number,
  status: string,
  role: string
) => {
  // Fetch booking
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);

  // throw error
  if (bookingRes.rowCount === 0) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];

  //Role validation
  if (role === "customer" && status !== "cancelled")
    throw new Error("Customers can only cancel bookings");
  if (role === "admin" && status !== "returned")
    throw new Error("Admins can only mark bookings as returned");

  // Update bookings
  const updateBookingRes = await pool.query(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, bookingId]
  );

  const updateBooking = updateBookingRes.rows[0];

  // if returned -> update vehicle availability
  if (status === "returned") {
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );
    return {
      ...updateBooking,
      vehicle: {
        availability_status: "available",
      },
    };
  }
  return updateBooking;
};

// Export
export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
