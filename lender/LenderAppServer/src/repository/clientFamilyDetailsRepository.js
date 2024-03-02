import pool from "../../db/connect.js";

export const createFamilyMember = async (
  id,
  clientId,
  member1,
  relation1,
  age1,
  occupation1,
  education1,
  income1,
  member2,
  relation2,
  age2,
  occupation2,
  education2,
  income2,
  member3,
  relation3,
  age3,
  occupation3,
  education3,
  income3,
  member4,
  relation4,
  age4,
  occupation4,
  education4,
  income4,
  member5,
  relation5,
  age5,
  occupation5,
  education5,
  income5
) => {
  try {
    const sql = `INSERT INTO familydetails (
      member1, relation1, age1, occupation1, education1, income1,
      member2, relation2, age2, occupation2, education2, income2,
      member3, relation3, age3, occupation3, education3, income3,
      member4, relation4, age4, occupation4, education4, income4,
      member5, relation5, age5, occupation5, education5, income5,
      id, clientId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const [result] = await pool.query(sql, [
      member1,
      relation1,
      age1,
      occupation1,
      education1,
      income1,
      member2,
      relation2,
      age2,
      occupation2,
      education2,
      income2,
      member3,
      relation3,
      age3,
      occupation3,
      education3,
      income3,
      member4,
      relation4,
      age4,
      occupation4,
      education4,
      income4,
      member5,
      relation5,
      age5,
      occupation5,
      education5,
      income5,
      id,
      clientId,
    ]);

    console.log("Inserted Family Member:", result);

    return result;
  } catch (error) {
    console.error(
      "Error creating family member in the database:",
      error.message
    );
    throw new Error("Error creating family member in the database");
  }
};

export const getAllFamilyMembers = async (clientId) => {
  try {
    let query = "SELECT * FROM familydetails WHERE 1"; // Initial query
    const queryParams = [];

    if (clientId) {
      query += " AND clientId = ?"; // Add condition for clientId
      queryParams.push(clientId);
    }

    const [rows] = await pool.query(query, queryParams);
    const count = rows.length; // Get the count of rows

    return { familyMembers: rows, count };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving family members from the database");
  }
};

export const getFamilyMemberById = async (id) => {
  try {
    const sql = "SELECT * FROM familydetails WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving family member from the database");
  }
};

export const updateFamilyMemberById = async (id, updatedFields) => {
  try {
    const fieldEntries = Object.entries(updatedFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(id);

    const updateQuery = `UPDATE familydetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;
    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating family member in the database");
  }
};

export const deleteFamilyMemberById = async (id) => {
  try {
    const sql = "DELETE FROM familydetails WHERE id = ?";
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting family member from the database");
  }
};
