import { StatusCodes } from "http-status-codes";
import * as roleDetailsRepository from "../repository/roleDetailsRepository.js";
import { nanoid } from "nanoid";

export const createRole = async (req, res) => {
  try {
    const { roleTitle, createdOn, createdBy } = req.body;

    if (!roleTitle || !createdBy) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "RoleTitle and CreatedBy are required fields",
      });
    }

    const id = nanoid(10); // Generate a 10-character ID using nanoid

    const result = await roleDetailsRepository.createRole(
      id,
      roleTitle,
      createdOn,
      createdBy
    );

    if (result) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Role created successfully", id });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to create role" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating role", error: error.message });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await roleDetailsRepository.getAllRoles();

    if (roles.length > 0) {
      return res.status(StatusCodes.OK).json({
        message: "Roles retrieved successfully",
        roles,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No roles found",
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving roles", error: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params; // Access the role ID from URL parameters

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid role ID provided" });
    }

    const role = await roleDetailsRepository.getRoleById(id);

    if (!role) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Role not found" });
    }

    return res.status(StatusCodes.OK).json({
      message: "Role retrieved successfully",
      role,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving role", error: error.message });
  }
};

export const updateRoleById = async (req, res) => {
  try {
    const { id } = req.params; // Access the role ID from URL parameters
    const updatedFields = req.body; // Fields to be updated

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid ID provided" });
    }

    const isRoleUpdated = await roleDetailsRepository.updateRoleById(
      id,
      updatedFields
    );

    if (!isRoleUpdated) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Role not found or not updated" });
    }

    const updatedRole = await roleDetailsRepository.getRoleById(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Role updated successfully", updatedRole });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating role", error: error.message });
  }
};

export const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid role ID provided",
      });
    }

    const deletionStatus = await roleDetailsRepository.deleteRoleById(id);

    if (deletionStatus) {
      return res.status(StatusCodes.OK).json({
        message: "Role deleted successfully",
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Role not found or already deleted",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting role",
      error: error.message,
    });
  }
};
