import pool from "../../db/connect.js";

export const createCenterEntry = async (
  id,
  centerCode,
  centerName,
  IFSC,
  TotalAmount,
  centerIncharge
) => {
  try {
    const sql = `INSERT INTO centerdetails (id, centerCode, centerName, IFSC, TotalAmount,centerIncharge) VALUES (?, ?, ?, ?, ?,?)`;
    const [result] = await pool.query(sql, [
      id,
      centerCode,
      centerName,
      IFSC,
      TotalAmount,
      centerIncharge,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating center entry in the database");
  }
};

export const getAllCenterEntries = async ({
  centerCode,
  centerName,
  IFSC,
  TotalAmount,
}) => {
  try {
    let sql = "SELECT * FROM centerdetails WHERE 1";
    const queryParams = [];

    if (centerCode) {
      sql += " AND centerCode = ?";
      queryParams.push(centerCode);
    }

    if (centerName) {
      sql += " AND centerName = ?";
      queryParams.push(centerName);
    }

    if (IFSC) {
      sql += " AND IFSC = ?";
      queryParams.push(IFSC);
    }

    if (TotalAmount) {
      sql += " AND TotalAmount = ?";
      queryParams.push(TotalAmount);
    }

    const [rows] = await pool.query(sql, queryParams);
    const count = rows.length; // Get the count of rows

    return { centers: rows, count }; // Return center details based on parameters
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving center details with given parameters from the database"
    );
  }
};

export const getCenterEntryById = async (id) => {
  try {
    const sql = "SELECT * FROM centerdetails WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving center entry from the database");
  }
};

export const updateCenterEntryById = async (id, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE centerdetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating center entry in the database");
  }
};

export const deleteCenterEntryById = async (id) => {
  try {
    const sql = "DELETE FROM centerdetails WHERE id = ?";
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting center entry from the database");
  }
};
