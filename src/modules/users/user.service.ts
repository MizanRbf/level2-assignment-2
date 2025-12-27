import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

// Get User
const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

// Update users
const updateUser = async () => {
  const result = await pool.query(``);
  return result;
};

// Delete Users
const deleteUser = async () => {
  const result = await pool.query(``);
  return result;
};

// Export
export const userServices = {
  getUser,
  updateUser,
  deleteUser,
};
