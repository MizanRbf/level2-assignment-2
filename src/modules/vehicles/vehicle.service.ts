import { pool } from "../../config/db";

// create vehicles
const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name,type,registration_number, daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

// get vehicles
const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

// get single vehicles
const getSingleVehicles = async (vehicleId: any) => {
  const result = await pool.query(
    `SELECT * FROM vehicles WHERE vehicleId = $1`,
    [vehicleId]
  );
  return result;
};

// Update Vehicle
const updateVehicle = async () => {
  const result = await pool.query(``);
  return result;
};

// Delete Vehicle
const deleteVehicle = async () => {
  const result = await pool.query(``);
  return result;
};

// Export
export const vehicleServices = {
  createVehicles,
  getVehicles,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
