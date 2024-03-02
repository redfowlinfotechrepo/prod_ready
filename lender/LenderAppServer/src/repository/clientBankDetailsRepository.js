import pool from "../../db/connect.js";
export const createClientBankDetails = async (
  id,
  clientID,
  AccountNo,
  IFSC,
  BranchName,
  BankName
) => {
  try {
    const sql = `INSERT INTO clientbankdetails (id, clientID, AccountNo, IFSC, BranchName, BankName) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      id,
      clientID,
      AccountNo,
      IFSC,
      BranchName,
      BankName,
    ]);

    // Check if the insert was successful
    if (result.affectedRows === 0) {
      throw new Error("Error creating client bank details in the database");
    }

    // Return the id along with the result
    return { result };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating client bank details in the database");
  }
};

export const getAllClientBankDetails = async () => {
  try {
    const sql = "SELECT * FROM clientbankdetails";
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving client bank details from the database");
  }
};

export const getClientBankDetailsById = async (id) => {
  try {
    const sql = "SELECT * FROM clientbankdetails WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving client bank details from the database");
  }
};

export const updateClientBankDetailsById = async (id, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE clientbankdetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false;
    }

    // Fetch the updated client details using the getClientBankDetailsById function
    const updatedClient = await getClientBankDetailsById(id);
    return updatedClient;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating client bank details in the database");
  }
};

export const updateClientBankDetailsByClientId = async (id, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE clientbankdetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE clientID = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);
    console.log(updateQuery);
    if (result.affectedRows === 0) {
      return false;
    }

    const updatedClient = await getClientBankDetailsById(result.id);
    console.log(result);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating client bank details in the database");
  }
};

export const deleteClientBankDetailsById = async (id) => {
  try {
    const sql = "DELETE FROM clientbankdetails WHERE id = ?";
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting client bank details from the database");
  }
};
