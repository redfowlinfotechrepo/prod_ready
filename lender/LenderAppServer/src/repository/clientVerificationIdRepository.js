import pool from "../../db/connect.js";

export const createClientVerification = async (
  id,
  GrSmartCard,
  GrAadharCard,
  GrPanCard,
  GrVoterId,
  GrOthers1,
  GrOthers2,
  ClSmartCard,
  ClAadharCard,
  ClVoterId,
  ClPanCard,
  ClOthers1,
  ClOthers2,
  customerId
) => {
  try {
    const sql = `INSERT INTO clientverificationid (
      id, GrSmartCard, GrAadharCard, GrPanCard,GrVoterId, GrOthers1, GrOthers2,
      ClSmartCard, ClAadharCard, ClVoterId, ClPanCard, ClOthers1, ClOthers2, customerId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const [result] = await pool.query(sql, [
      id,
      GrSmartCard,
      GrAadharCard,
      GrPanCard,
      GrVoterId,
      GrOthers1,
      GrOthers2,
      ClSmartCard,
      ClAadharCard,
      ClVoterId,
      ClPanCard,
      ClOthers1,
      ClOthers2,
      customerId,
    ]);

    return result; // Return the ID of the inserted row
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error creating client verification details in the database"
    );
  }
};

export const getAllClientVerifications = async () => {
  try {
    const sql = "SELECT * FROM clientverificationid";
    const [rows] = await pool.query(sql);

    return rows; // Return all client verification details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client verification details from the database"
    );
  }
};

export const getClientVerificationById = async (id) => {
  try {
    const sql = "SELECT * FROM clientverificationid WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return null; // If no client verification found with the given id, return null
    }

    const clientVerification = rows[0]; // Fetch the first (and only) row

    return clientVerification; // Return the client verification details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client verification details from the database"
    );
  }
};

export const updateClientVerificationById = async (id, updatedFields) => {
  const updateFields = { ...updatedFields };

  try {
    const fieldEntries = Object.entries(updateFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE clientverificationid SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;

    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return null; // If no row was updated, return null
    }
    const updatedClientVerification = await getClientVerificationById(id);
    console.log(result);

    return updatedClientVerification; // Return the updated client verification details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error updating client verification details in the database"
    );
  }
};

export const deleteClientVerificationById = async (id) => {
  try {
    const sql = "DELETE FROM clientverificationid WHERE id = ?";
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return false; // If no client verification details were deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error deleting client verification details from the database"
    );
  }
};
