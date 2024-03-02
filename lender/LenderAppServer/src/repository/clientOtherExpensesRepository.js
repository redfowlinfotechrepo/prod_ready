import pool from "../../db/connect.js";

export const createClientHouseHold = async (
  id,
  Loan,
  Education,
  Rent,
  Medical,
  Others,
  Total,
  TotalIncome,
  TotalExpenses,
  Balance,
  customerId
) => {
  try {
    const sql = `INSERT INTO clienthouseholddetails (
      id,
      Loan,
      Education,
      Rent,
      Medical,
      Others,
      Total,
      TotalIncome,
      TotalExpenses,
      Balance,
      customerId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      id,
      Loan,
      Education,
      Rent,
      Medical,
      Others,
      Total,
      TotalIncome,
      TotalExpenses,
      Balance,
      customerId,
    ]);

    return result; // Return the ID of the inserted row
  } catch (error) {
    console.log(error);
    throw new Error("Error creating client house hold details in the database");
  }
};

export const getAllClientHouseHold = async () => {
  try {
    const sql = "SELECT * FROM clienthouseholddetails";
    const [rows] = await pool.query(sql);

    return rows; // Return all client house hold details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client house hold details from the database"
    );
  }
};

export const getClientHouseHoldById = async (id) => {
  try {
    const sql = "SELECT * FROM clienthouseholddetails WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return null; // If no client house hold details found with the given ID, return null
    }

    const clientHouseHold = rows[0]; // Fetch the first (and only) row

    return clientHouseHold; // Return the client house hold details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client house hold details from the database"
    );
  }
};

// Import necessary modules and configurations

export const updateClientHouseHoldDetailsById = async (id, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE clienthouseholddetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;

    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false; // Indicates that no rows were updated
    }

    // Return the updated details by calling the function to fetch details by id
    const updatedDetails = await getClientHouseHoldById(id);
    return updatedDetails;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating client house hold details in the database");
  }
};

export const deleteClientHouseHoldById = async (id) => {
  try {
    const sql = "DELETE FROM clienthouseholddetails WHERE id = ?";
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return false; // If no client house hold details were deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error deleting client house hold details from the database"
    );
  }
};
