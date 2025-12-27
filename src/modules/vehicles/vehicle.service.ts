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
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return result;
};

// Update Vehicle
const updateVehicle = async (vehicleId: number, body: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = body;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  return result;
};

// Delete Vehicle
const deleteVehicle = async (vehicleId: number) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
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
