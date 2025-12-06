import { pool } from "../../config/db";

// Create User
const createUser = async (user: any) => {
  const { name, email, password, phone, role } = user;
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [name, email, password, phone, role]
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
