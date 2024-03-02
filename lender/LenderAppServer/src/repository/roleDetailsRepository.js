import pool from "../../db/connect.js";

export const createRole = async (roleId, roleTitle, createdOn, createdBy) => {
  try {
    const sql =
      "INSERT INTO roledetails (id, RoleTitle, CreatedOn, CreatedBy) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(sql, [
      roleId,
      roleTitle,
      createdOn,
      createdBy,
    ]);

    return result; // Return the ID of the inserted row
  } catch (error) {
    console.log(error);
    throw new Error("Error creating role in the database");
  }
};

export const getAllRoles = async () => {
  try {
    const sql = "SELECT * FROM roledetails";
    const [rows] = await pool.query(sql);

    return rows; // Return all roles
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving roles from the database");
  }
};

export const getRoleById = async (roleId) => {
  try {
    const sql = "SELECT * FROM roledetails WHERE id = ?";
    const [rows] = await pool.query(sql, [roleId]);

    if (rows.length === 0) {
      return null; // If no role found with the given id, return null
    }

    const role = rows[0]; // Fetch the first (and only) row

    return role; // Return the role data
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving role from the database");
  }
};

export const updateRoleById = async (roleId, updatedFields) => {
  const { roleTitle, createdOn, createdBy } = updatedFields;

  const updateFields = {};
  if (roleTitle !== undefined) updateFields.RoleTitle = roleTitle;
  if (createdOn !== undefined) updateFields.CreatedOn = createdOn;
  if (createdBy !== undefined) updateFields.CreatedBy = createdBy;

  try {
    const fieldEntries = Object.entries(updateFields);
    const fieldValues = fieldEntries.map(([key, value]) => value);
    fieldValues.push(roleId);

    const updateQuery = `UPDATE roledetails SET ${fieldEntries
      .map(([key]) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;

    const [result] = await pool.query(updateQuery, fieldValues);

    if (result.affectedRows === 0) {
      return null; // If no role was updated, return null
    }

    const updatedRole = await getRoleById(roleId); // Assuming there's a function to fetch an updated role by its ID
    return updatedRole; // Return the updated role
  } catch (error) {
    console.log(error);
    throw new Error("Error updating role in the database");
  }
};

export const deleteRoleById = async (roleId) => {
  try {
    const sql = "DELETE FROM roledetails WHERE id = ?";
    const [result] = await pool.query(sql, [roleId]);

    if (result.affectedRows === 0) {
      return false; // If no role was deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting role from the database");
  }
};
