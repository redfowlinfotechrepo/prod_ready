import pool from "../../db/connect.js";

export const createCashFlowEntry = async (
  ID,
  SalesExecID,
  dateOfLoan,
  DayOfCollection,
  CenterID,
  CustomerID,
  LoanAmount,
  Interest,
  CurrentPayCount,
  PayCount,
  PrincipalAmount,
  Status
) => {
  try {
    const sql = `INSERT INTO moneyrecord (ID, SalesExecID, dateOfLoan, DayOfCollection, CenterID, CustomerID, LoanAmount, Interest, CurrentPayCount, PayCount, PrincipalAmount, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      ID,
      SalesExecID,
      dateOfLoan,
      DayOfCollection,
      CenterID,
      CustomerID,
      LoanAmount,
      Interest,
      CurrentPayCount,
      PayCount,
      PrincipalAmount,
      Status,
    ]);

    console.log("Inserted Cash Flow Entry:", result);

    return result;
  } catch (error) {
    console.error(
      "Error creating cash flow entry in the database:",
      error.message
    );
    throw new Error("Error creating cash flow entry in the database");
  }
};

export const getAllCashFlowEntries = async ({
  SalesExecID,
  dateOfLoan,
  DayOfCollection,
  CenterID,
  CustomerID,
  LoanAmount,
  CurrentPayCount,
  PayCount,
  PrincipalAmount,
  Status,
}) => {
  try {
    let sql = "SELECT * FROM moneyrecord WHERE 1";
    const queryParams = [];

    if (SalesExecID) {
      sql += " AND SalesExecID = ?";
      queryParams.push(SalesExecID);
    }

    if (dateOfLoan) {
      sql += " AND dateOfLoan = ?";
      queryParams.push(dateOfLoan);
    }

    if (DayOfCollection) {
      sql += " AND DayOfCollection = ?";
      queryParams.push(DayOfCollection);
    }

    if (CenterID) {
      sql += " AND CenterID = ?";
      queryParams.push(CenterID);
    }

    if (CustomerID) {
      sql += " AND CustomerID = ?";
      queryParams.push(CustomerID);
    }

    if (LoanAmount) {
      sql += " AND LoanAmount = ?";
      queryParams.push(LoanAmount);
    }

    if (CurrentPayCount) {
      sql += " AND CurrentPayCount = ?";
      queryParams.push(CurrentPayCount);
    }

    if (PayCount) {
      sql += " AND PayCount = ?";
      queryParams.push(PayCount);
    }

    if (PrincipalAmount) {
      sql += " AND PrincipalAmount = ?";
      queryParams.push(PrincipalAmount);
    }

    if (Status) {
      sql += " AND Status = ?";
      queryParams.push(Status);
    }

    const [rows] = await pool.query(sql, queryParams);
    const count = rows.length; // Get the count of rows

    return { entries: rows, count }; // Return entries based on parameters
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving entries from the database");
  }
};

export const getEntryById = async (ID) => {
  try {
    const sql = "SELECT * FROM moneyrecord WHERE ID = ?";
    const [rows] = await pool.query(sql, [ID]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving entry from the database");
  }
};

export const updateEntryById = async (ID, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(ID);

    const updateQuery = `UPDATE moneyrecord SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE ID = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating entry in the database");
  }
};

export const deleteEntryById = async (ID) => {
  try {
    const sql = "DELETE FROM moneyrecord WHERE ID = ?";
    const [result] = await pool.query(sql, [ID]);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting entry from the database");
  }
};
