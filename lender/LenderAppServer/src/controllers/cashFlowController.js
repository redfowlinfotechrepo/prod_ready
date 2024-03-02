import { StatusCodes } from "http-status-codes";
import * as cashFlowRepository from "../repository/cashFlowRepository.js";
import { nanoid } from "nanoid";

const generateUniqueIdentifier = () => {
  const randomDigits = nanoid(5);
  return `TRANS${randomDigits}`;
};

export const createEntry = async (req, res) => {
  try {
    const {
      SalesExecID,
      Date,
      CollectionDate,
      CenterID,
      CustomerID,
      LoanAmount,
      Interest,
      CurrentPayCount,
      PayCount,
      PrincipalAmount,
      Status,
    } = req.body;

    const id = generateUniqueIdentifier();

    const result = await cashFlowRepository.createCashFlowEntry(
      id,
      SalesExecID,
      Date,
      CollectionDate,
      CenterID,
      CustomerID,
      LoanAmount,
      Interest,
      CurrentPayCount,
      PayCount,
      PrincipalAmount,
      Status
    );

    res.status(StatusCodes.CREATED).json({
      message: "Entry created successfully",
      result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating entry",
      error: error.message,
    });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const {
      SalesExecID,
      DateOfLoan,
      DateOfCollection,
      CenterID,
      CustomerID,
      LoanAmount,
      CurrentPayCount,
      PayCount,
      PrincipalAmount,
      Status,
    } = req.query;

    const result = await cashFlowRepository.getAllCashFlowEntries({
      SalesExecID,
      DateOfLoan,
      DateOfCollection,
      CenterID,
      CustomerID,
      LoanAmount,
      CurrentPayCount,
      PayCount,
      PrincipalAmount,
      Status,
    });

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving entries",
      error: error.message,
    });
  }
};

export const getEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cashFlowRepository.getEntryById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found" });
    }

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving entry",
      error: error.message,
    });
  }
};

export const updateEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await cashFlowRepository.updateEntryById(id, updatedFields);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found or not updated" });
    }

    const updatedDetails = await cashFlowRepository.getEntryById(id);
    res.status(StatusCodes.OK).json({
      message: "Entry updated successfully",
      result: updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating entry",
      error: error.message,
    });
  }
};

export const deleteEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cashFlowRepository.deleteEntryById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found or not deleted" });
    }

    res.status(StatusCodes.OK).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting entry",
      error: error.message,
    });
  }
};
