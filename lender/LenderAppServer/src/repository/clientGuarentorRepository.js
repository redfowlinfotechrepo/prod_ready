import pool from "../../db/connect.js";

export const createClientGuarantorDetails = async (
  guarantorId,
  customerId,
  guarantorName,
  spouseName,
  fatherName,
  motherName,
  relation,
  dateOfBirth,
  age,
  grMobileNo1,
  grMobileNo2,
  grAddress,
  grIsOwned = false,
  grIsRented = false
) => {
  try {
    const sql = `INSERT INTO clientguarantordetails (
      GuarentorID, CustomerID, GuarantorName, SpouseName, FatherName, MotherName,
      Relation, DateOfBirth, Age, GrMobileNo1, GrMobileNo2, GrAddress,
      GrIsOwned, GrIsRented
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      guarantorId,
      customerId,
      guarantorName,
      spouseName,
      fatherName,
      motherName,
      relation,
      dateOfBirth,
      age,
      grMobileNo1,
      grMobileNo2,
      grAddress,
      grIsOwned,
      grIsRented,
    ]);

    return result; // Return the ID of the inserted row
  } catch (error) {
    console.log(error);
    throw new Error("Error creating client guarantor details in the database");
  }
};

export const getAllClientGuarantorDetails = async () => {
  try {
    const sql = "SELECT * FROM clientguarantordetails";
    const [rows] = await pool.query(sql);

    return rows; // Return all client guarantor details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client guarantor details from the database"
    );
  }
};

export const getClientGuarantorById = async (guarantorId) => {
  try {
    const sql = "SELECT * FROM clientguarantordetails WHERE GuarentorID = ?";
    const [rows] = await pool.query(sql, [guarantorId]);

    if (rows.length === 0) {
      return null; // If no client guarantor details found with the given guarantorId, return null
    }

    const clientGuarantor = rows[0]; // Fetch the first (and only) row

    return clientGuarantor; // Return the client guarantor details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client guarantor details from the database"
    );
  }
};

//Need to work on
export const updateClientGuarantorById = async (guarantorId, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(guarantorId);

    const updateQuery = `UPDATE clientguarantordetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE GuarentorID = ?`;

    const [result] = await pool.query(updateQuery, fieldValues);

    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    console.error("Error updating client guarantor details:", error);
    throw error;
  }
};

export const deleteClientGuarantorById = async (guarantorId) => {
  try {
    const sql = "DELETE FROM clientguarantordetails WHERE GuarentorID = ?";
    const [result] = await pool.query(sql, [guarantorId]);

    if (result.affectedRows === 0) {
      return false; // If no client guarantor details were deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error deleting client guarantor details from the database"
    );
  }
};
