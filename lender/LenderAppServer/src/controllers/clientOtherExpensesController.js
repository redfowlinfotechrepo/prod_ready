import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import * as clientOtherExpensesRepository from "../repository/clientOtherExpensesRepository.js";

export const createClientHouseHold = async (req, res) => {
  try {
    const {
      Loan,
      Education,
      Rent,
      Medical,
      Others,
      Total,
      TotalIncome,
      TotalExpenses,
      Balance,
      customerId,
    } = req.body;

    const id = nanoid(); // Generating a unique ID using nanoid

    const result = await clientOtherExpensesRepository.createClientHouseHold(
      id,
      Loan,
      Education,
      Rent,
      Medical,
      Others,
      Total,
      TotalIncome,
      TotalExpenses,
      Balance,
      customerId
    );

    res.status(StatusCodes.CREATED).json({
      message: "Client house hold details created successfully",
      result,
      id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating client house hold details",
      error: error.message,
    });
  }
};

export const getAllClientHouseHold = async (req, res) => {
  try {
    const clientHouseHold =
      await clientOtherExpensesRepository.getAllClientHouseHold();

    res.status(StatusCodes.OK).json({
      message: "Retrieved all client house hold details",
      clientHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client house hold details",
      error: error.message,
    });
  }
};

export const getClientHouseHoldById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid ID provided",
      });
    }

    const clientHouseHold =
      await clientOtherExpensesRepository.getClientHouseHoldById(id);

    if (!clientHouseHold) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Client house hold details not found",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Client house hold details found",
      clientHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client house hold details",
      error: error.message,
    });
  }
};

export const updateClientHouseHoldById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid ID provided",
      });
    }

    const updatedClientHouseHold =
      await clientOtherExpensesRepository.updateClientHouseHoldDetailsById(
        id,
        updatedFields
      );

    if (!updatedClientHouseHold) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Client house hold details not found or not updated",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Client house hold details updated successfully",
      updatedClientHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating client house hold details",
      error: error.message,
    });
  }
};

export const deleteClientHouseHoldById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid ID provided",
      });
    }

    const deletionStatus =
      await clientOtherExpensesRepository.deleteClientHouseHoldById(id);

    if (!deletionStatus) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Client house hold details not found or already deleted",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Client house hold details deleted successfully",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting client house hold details",
      error: error.message,
    });
  }
};
