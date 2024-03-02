import pool from "../../db/connect.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Assuming you have a database pool named 'pool' and necessary bcrypt and jwt imports

export const loginUser = async (phoneNumber, password) => {
  try {
    // Fetch user details by phone number
    const [userRows] = await pool.query(
      "SELECT * FROM empdetails WHERE Phone = ? LIMIT 1",
      [phoneNumber]
    );
    if (userRows.length === 0) {
      return { message: "User not found" }; // Sending message if user is not found
    }
    const user = userRows[0];
    const role = user.Role;
    const userId = user.id;
    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // If password is correct, generate JWT token
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        userId: user.id,
        UserName: user.Name,
        userPhone: user.Phone,
        userEmail: user.EmailAddr,
        userPhoto: user.Photo,
        userAddress: user.Address,
        govtId: user.GovtID,
      },
      secretKey,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    return { token, role, userId };
  } catch (error) {
    console.log(error);
    return error;

    throw new Error(`Error logging in: ${error.message}`);
  }
};

export const createEmployee = async (
  generatedId,
  name,
  phoneNumber,
  email,
  photo,
  address,
  govtId,
  role,
  password,
  centerId
) => {
  try {
    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO empdetails (id, Name, Phone, EmailAddr, Photo, Address, GovtID, Role, password,centerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        generatedId,
        name,
        phoneNumber,
        email,
        photo,
        address,
        govtId,
        role,
        hashedPassword,
        centerId,
      ]
    );

    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: generatedId,
        UserName: name,
        userPhone: phoneNumber,
        userEmail: email,
        userPhoto: photo,
        userAddress: address,
        userId: govtId,
        centerId: centerId,
      },
      secretKey,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    return { generatedId, token }; // Return generatedId and token
  } catch (error) {
    console.log(error);
    throw new Error("Error creating employee in the database");
  }
};

export const getAllEmployees = async ({
  phoneNumber,
  EmailAddr,
  Role,
  centerId,
}) => {
  try {
    let query = "SELECT * FROM empdetails WHERE 1"; // Initial query

    const queryParams = [];

    if (phoneNumber) {
      query += " AND Phone = ?"; // Add condition for phoneNumber
      queryParams.push(phoneNumber);
    }

    if (EmailAddr) {
      query += " AND EmailAddr = ?"; // Add condition for EmailAddr
      queryParams.push(EmailAddr);
    }

    if (Role) {
      query += " AND Role = ?"; // Add condition for Role
      queryParams.push(Role);
    }
    if (centerId) {
      query += " AND centerId = ?"; // Add condition for Role
      queryParams.push(centerId);
    }

    const [rows, fields] = await pool.query(query, queryParams);
    const count = rows.length; // Get the count of rows

    return { employees: rows, count }; // Return employee data and count
  } catch (error) {
    console.log(error);
    return error;

    throw new Error("Error retrieving employees from the database");
  }
};

export const getEmployeeById = async (id) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM empdetails WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null; // If no employee found with the given id, return null
    }

    const employee = rows[0]; // Fetch the first (and only) row

    return employee; // Return the employee data
  } catch (error) {
    console.log(error);

    throw new Error("Error retrieving employee from the database");
  }
};

export const deleteEmployeeById = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM empdetails WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return false; // If no employee was deleted, return false
    }

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.log(error);

    throw new Error("Error deleting employee from the database");
  }
};

export const updateEmployeeById = async (id, updatedFields) => {
  const { name, phoneNumber, email, photo, address, govtId, role, password } =
    updatedFields;

  const updateFields = {};
  if (name) updateFields.Name = name;
  if (phoneNumber) updateFields.Phone = phoneNumber;
  if (email) updateFields.EmailAddr = email;
  if (photo) updateFields.Photo = photo;
  if (address) updateFields.Address = address;
  if (govtId) updateFields.GovtID = govtId;
  if (role) updateFields.Role = role;
  if (password) updateFields.password = password;

  try {
    const [result] = await pool.query("UPDATE empdetails SET ? WHERE id = ?", [
      updateFields,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null; // If no employee was updated, return null
    }

    // If an employee was updated, fetch and return the updated employee
    const updatedEmployee = await getEmployeeById(id);
    return updatedEmployee;
  } catch (error) {
    console.log(error);

    throw new Error("Error updating employee in the database");
  }
};
