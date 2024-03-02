import pool from "../../db/connect.js";

export const createTransactionLog = async (
  transId,
  date,
  amount,
  typeOfTrans,
  investorId,
  centerId,
  salesExecId,
  clientId,
  modeOfTrans
) => {
  try {
    const sql = `INSERT INTO transactionlogs (TransId, Date, Amount, TypeOfTrans, InvestorId, CenterId, SalesExecId, ClientId, ModeOfTrans) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      transId,
      date,
      amount,
      typeOfTrans,
      investorId,
      centerId,
      salesExecId,
      clientId,
      modeOfTrans,
    ]);

    // Check if the insert was successful
    if (result.affectedRows === 0) {
      throw new Error("Error creating transaction log in the database");
    }

    // Return the id along with the result
    return { result };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating transaction log in the database");
  }
};

export const getAllTransactionLogs = async ({
  date,
  typeOfTrans,
  investorId,
  centerId,
  salesExecId,
  clientId,
}) => {
  try {
    let query = "SELECT * FROM transactionlogs WHERE 1"; // Initial query

    const queryParams = [];

    if (date) {
      query += " AND Date = ?"; // Add condition for date
      queryParams.push(date);
    }

    if (typeOfTrans) {
      query += " AND TypeOfTrans = ?"; // Add condition for typeOfTrans
      queryParams.push(typeOfTrans);
    }

    if (investorId) {
      query += " AND InvestorId = ?"; // Add condition for investorId
      queryParams.push(investorId);
    }

    if (centerId) {
      query += " AND CenterId = ?"; // Add condition for centerId
      queryParams.push(centerId);
    }

    if (salesExecId) {
      query += " AND SalesExecId = ?"; // Add condition for salesExecId
      queryParams.push(salesExecId);
    }

    if (clientId) {
      query += " AND ClientId = ?"; // Add condition for clientId
      queryParams.push(clientId);
    }

    const [rows, fields] = await pool.query(query, queryParams);
    const count = rows.length; // Get the count of rows

    return { transactionLogs: rows, count }; // Return transaction log data and count
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving transaction logs from the database");
  }
};

export const getTransactionLogById = async (transId) => {
  try {
    const sql = "SELECT * FROM transactionlogs WHERE TransId = ?";
    const [rows] = await pool.query(sql, [transId]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving transaction log from the database");
  }
};

export const updateTransactionLogById = async (transId, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(transId);

    const updateQuery = `UPDATE transactionlogs SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE TransId = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false;
    }

    // Fetch the updated transaction log using the getTransactionLogById function
    const updatedTransactionLog = await getTransactionLogById(transId);
    return updatedTransactionLog;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating transaction log in the database");
  }
};

export const deleteTransactionLogById = async (transId) => {
  try {
    const sql = "DELETE FROM transactionlogs WHERE TransId = ?";
    const [result] = await pool.query(sql, [transId]);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting transaction log from the database");
  }
};
