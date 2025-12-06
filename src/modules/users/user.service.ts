import { pool } from "../../config/db";

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
const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
export const userServices = {
  createUser,
  getUser,
};
