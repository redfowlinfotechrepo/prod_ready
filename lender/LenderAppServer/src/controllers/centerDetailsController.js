import { StatusCodes } from "http-status-codes";
import * as centerDetailsRepository from "../repository/centerDetailsRepository.js";
import { nanoid } from "nanoid";

const generateUniqueIdentifier = () => {
  const randomDigits = nanoid(5);
  return `CEN${randomDigits}`;
};

export const createCenterEntry = async (req, res) => {
  try {
    const { centerCode, centerName, IFSC, TotalAmount, centerIncharge } =
      req.body;
    const id = generateUniqueIdentifier();

    const result = await centerDetailsRepository.createCenterEntry(
      id,
      centerCode,
      centerName,
      IFSC,
      TotalAmount,
      centerIncharge
    );

    res.status(StatusCodes.CREATED).json({
      message: "Center entry created successfully",
      result,
      id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating center entry",
      error: error.message,
    });
  }
};

export const getAllCenterEntries = async (req, res) => {
  try {
    const { centerCode, centerName, IFSC, TotalAmount } = req.query;
    const result = await centerDetailsRepository.getAllCenterEntries({
      centerCode,
      centerName,
      IFSC,
      TotalAmount,
    });
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving center entries",
      error: error.message,
    });
  }
};

export const getCenterEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await centerDetailsRepository.getCenterEntryById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Center entry not found" });
    }

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving center entry",
      error: error.message,
    });
  }
};

export const updateCenterEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await centerDetailsRepository.updateCenterEntryById(
      id,
      updatedFields
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Center entry not found or not updated" });
    }

    const updatedDetails = await centerDetailsRepository.getCenterEntryById(id);
    res.status(StatusCodes.OK).json({
      message: "Center entry updated successfully",
      result: updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating center entry",
      error: error.message,
    });
  }
};

export const deleteCenterEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await centerDetailsRepository.deleteCenterEntryById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Center entry not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Center entry deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting center entry",
      error: error.message,
    });
  }
};
