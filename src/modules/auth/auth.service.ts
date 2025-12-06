import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

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

  // token generate
};
