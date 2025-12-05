import { pool } from "../../config/db";

const createUser = async () => {
  const result = await pool.query(``);
  return result;
};

export const userServices = {
  createUser,
};
