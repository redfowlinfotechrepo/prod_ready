import pool from "../../db/connect.js";

export const createClientPersonalDetails = async (
  centerId,
  customerId,
  customerName,
  spouseName,
  fatherName,
  motherName,
  dateOfBirth,
  age,
  address,
  residenceCustYr,
  mobileNo1,
  mobileNo2,
  isTatchedHouse = false,
  isRoofTiles = false,
  isMetalsheets = false,
  isCementSheetsRoof = false,
  isCementConcreteCeil = false,
  isHindu = false,
  isMuslim = false,
  isChristian = false,
  isOthers = false,
  isMarried = false,
  isSingle = false,
  isWidow = false,
  isDivorced = false,
  isSeparate = false,
  isOwned = false,
  isRented = false,
  SalesExecID
) => {
  try {
    const sql = `INSERT INTO clientpersonal (
      centerId, CustomerId, CustomerName, SpouseName, FatherName, MotherName,
      DateOfBirth, Age, Address, ResidenceCustYr, MobileNo1, MobileNo2,
      isTatchedHouse, isRoofTiles, isMetalsheets, isCementSheetsRoof,
      isCementConcreteCeil, isHindu, isMuslim, isChristian, isOthers,
      isMarried, isSingle, isWidow, isDivorced, isSeparate, isOwned, isRented,SalesExecID
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const [result] = await pool.query(sql, [
      centerId,
      customerId,
      customerName,
      spouseName,
      fatherName,
      motherName,
      dateOfBirth,
      age,
      address,
      residenceCustYr,
      mobileNo1,
      mobileNo2,
      isTatchedHouse,
      isRoofTiles,
      isMetalsheets,
      isCementSheetsRoof,
      isCementConcreteCeil,
      isHindu,
      isMuslim,
      isChristian,
      isOthers,
      isMarried,
      isSingle,
      isWidow,
      isDivorced,
      isSeparate,
      isOwned,
      isRented,
      SalesExecID,
    ]);

    return result; // Return the ID of the inserted row
  } catch (error) {
    console.log(error);
    throw new Error("Error creating client personal details in the database");
  }
};

export const getAllClientPersonalDetails = async ({
  MobileNo1,
  salesExecID,
}) => {
  try {
    let sql = "SELECT * FROM clientpersonal WHERE 1";
    const queryParams = [];

    if (MobileNo1) {
      sql += " AND MobileNo1 = ?";
      queryParams.push(MobileNo1);
    }

    if (salesExecID) {
      sql += " AND salesExecID = ?";
      queryParams.push(salesExecID);
    }

    console.log(sql);

    const [rows] = await pool.query(sql, queryParams);
    const count = rows.length; // Get the count of rows

    return { clients: rows, count }; // Return client personal details based on parameters
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client personal details with given parameters from the database"
    );
  }
};

export const getClientPersonalById = async (customerId) => {
  try {
    const sql = "SELECT * FROM clientpersonal WHERE CustomerId = ?";
    const [rows] = await pool.query(sql, [customerId]);

    if (rows.length === 0) {
      return null; // If no client personal details found with the given customerId, return null
    }

    const clientPersonal = rows[0]; // Fetch the first (and only) row

    return clientPersonal; // Return the client personal details
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error retrieving client personal details from the database"
    );
  }
};

export const updateClientPersonalById = async (id, updatedFields) => {
  const updateFields = { ...updatedFields };
  // Remove the ID from the fields to update
  //   delete updateFields.id;

  try {
    const fieldEntries = Object.entries(updateFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE clientpersonal SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE CustomerId = ?`;

    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false; // If no row was updated, return false
    }

    return true; // Return true indicating successful update
  } catch (error) {
    console.log(error);
    throw new Error("Error updating client personal details in the database");
  }
};

export const deleteClientPersonalById = async (customerId) => {
  try {
    const sql = "DELETE FROM clientpersonal WHERE CutomerID = ?";
    const [result] = await pool.query(sql, [customerId]);

    if (result.affectedRows === 0) {
      return false; // If no client personal details were deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting client personal details from the database");
  }
};
