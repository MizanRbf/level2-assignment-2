import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

// Get User
const getUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
  return result;
};

// Update users
const updateUser = async (id: number, body: any) => {
  const { name, email, password, phone, role } = body;
  const result = await pool.query(
    `UPDATE users SET name = COALESCE($1,name), email = COALESCE($2,email), password = COALESCE($3,password), phone = COALESCE($4,phone), role = COALESCE($5,role)  WHERE id = $6 RETURNING *`,
    [name, email, password, phone, role, id]
  );
  return result;
};

// Delete Users
const deleteUser = async (id: number) => {
  // Check active bookings
  const bookingCheck = await pool.query(
    `SELECT 1 FROM bookings WHERE user_id = $1 AND status = 'active' LIMIT 1`,
    [id]
  );
  const hasActiveBookings = (bookingCheck.rowCount ?? 0) > 0;

  if (hasActiveBookings) {
    throw new Error("User cannot be deleted because they have active bookings");
  }

  // delete user
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
};

// Export
export const userServices = {
  getUser,
  updateUser,
  deleteUser,
};
