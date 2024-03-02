import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import * as clientVerificationRepository from "../repository/clientVerificationIdRepository.js";

export const createClientVerification = async (req, res) => {
  try {
    const {
      GrSmartCard,
      GrAadharCard,
      GrPanCard,
      GrVoterId,
      GrOthers1,
      GrOthers2,
      ClSmartCard,
      ClAadharCard,
      ClVoterId,
      ClPanCard,
      ClOthers1,
      ClOthers2,
      customerId,
    } = req.body;

    const id = nanoid(); // Generating a unique ID using nanoid

    const result = await clientVerificationRepository.createClientVerification(
      id,
      GrSmartCard,
      GrAadharCard,
      GrPanCard,
      GrVoterId,
      GrOthers1,
      GrOthers2,
      ClSmartCard,
      ClAadharCard,
      ClVoterId,
      ClPanCard,
      ClOthers1,
      ClOthers2,
      customerId
    );

    res.status(StatusCodes.CREATED).json({
      message: "Client verification details created successfully",
      result,
      id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating client verification details",
      error: error.message,
    });
  }
};

export const getAllClientVerifications = async (req, res) => {
  try {
    const clientVerifications =
      await clientVerificationRepository.getAllClientVerifications();

    res.status(StatusCodes.OK).json({
      message: "Retrieved all client verification details",
      clientVerifications,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client verification details",
      error: error.message,
    });
  }
};

export const getClientVerificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const clientVerification =
      await clientVerificationRepository.getClientVerificationById(id);

    if (!clientVerification) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client verification not found" });
    }

    res.status(StatusCodes.OK).json({
      message: "Client verification found",
      clientVerification,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client verification",
      error: error.message,
    });
  }
};

export const updateClientVerificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const updatedClientVerification =
      await clientVerificationRepository.updateClientVerificationById(
        id,
        updatedFields
      );

    if (!updatedClientVerification) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client verification not found or not updated" });
    }

    res.status(StatusCodes.OK).json({
      message: "Client verification updated successfully",
      updatedClientVerification,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating client verification",
      error: error.message,
    });
  }
};

export const deleteClientVerificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletionStatus =
      await clientVerificationRepository.deleteClientVerificationById(id);

    if (!deletionStatus) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client verification not found or already deleted" });
    }

    res.status(StatusCodes.OK).json({
      message: "Client verification deleted successfully",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting client verification",
      error: error.message,
    });
  }
};
