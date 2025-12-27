import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

// Create User
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  if ((password as string).length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [name, email, hashedPass, phone, role]
  );
  return result;
};

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
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
