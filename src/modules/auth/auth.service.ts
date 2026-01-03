import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

// create user
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

// login user
const loginUser = async (email: string, password: string) => {
  // user checkup
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  // user null
  if (result.rows.length === 0) {
    return null;
  }

  // user found
  const user = result.rows[0];

  // password checkup
  const match = await bcrypt.compare(password, user.password);

  // password null
  if (!match) {
    return false;
  }

  // Remove password manually
  delete user.password;

  // token generate
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};
export const authService = {
  loginUser,
  createUser,
};
