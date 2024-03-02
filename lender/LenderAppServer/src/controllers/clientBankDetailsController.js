import { StatusCodes } from "http-status-codes";
import * as clientBankRepository from "../repository/clientBankDetailsRepository.js";
import { nanoid } from "nanoid";

export const createClientBankDetails = async (req, res) => {
  try {
    const { clientID, AccountNo, IFSC, BranchName, BankName } = req.body;
    const id = nanoid(10); // Generating a unique ID using nanoid

    const result = await clientBankRepository.createClientBankDetails(
      id,
      clientID,
      AccountNo,
      IFSC,
      BranchName,
      BankName
    );

    res.status(StatusCodes.CREATED).json({
      message: "Client bank details created successfully",
      result,
      id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating client bank details",
      error: error.message,
    });
  }
};

export const getAllClientBankDetails = async (req, res) => {
  try {
    const result = await clientBankRepository.getAllClientBankDetails();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client bank details",
      error: error.message,
    });
  }
};

export const getClientBankDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientBankRepository.getClientBankDetailsById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client bank details not found" });
    }

    res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client bank details",
      error: error.message,
    });
  }
};

export const updateClientBankDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await clientBankRepository.updateClientBankDetailsById(
      id,
      updatedFields
    );
    console.log(result);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Client bank details not found or not updated",
        result: result,
      });
    }

    const updatedDetails = await clientBankRepository.getClientBankDetailsById(
      id
    );
    res.status(StatusCodes.OK).json({
      message: "Client bank details updated successfully",
      result: updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating client bank details",
      error: error.message,
    });
  }
};

export const updateClientBankDetailsByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await clientBankRepository.updateClientBankDetailsByClientId(
      id,
      updatedFields
    );
    console.log(result);
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client bank details not found or not updated" });
    }

    const updatedDetails = await clientBankRepository.getClientBankDetailsById(
      id
    );
    res.status(StatusCodes.OK).json({
      message: "Client bank details updated successfully",
      result: updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating client bank details",
      error: error.message,
    });
  }
};

export const deleteClientBankDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientBankRepository.deleteClientBankDetailsById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client bank details not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Client bank details deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting client bank details",
      error: error.message,
    });
  }
};
