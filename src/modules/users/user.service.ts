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
    `UPDATE users SET name = $1, email = $2, password = $3, phone = $4, role = $5  WHERE id = $6 RETURNING *`,
    [name, email, password, phone, role, id]
  );
  return result;
};

// Delete Users
const deleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

// Export
export const userServices = {
  getUser,
  updateUser,
  deleteUser,
};
