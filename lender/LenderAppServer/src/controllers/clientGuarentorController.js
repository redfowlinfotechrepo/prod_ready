import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import * as clientGuarantorRepository from "../repository/clientGuarentorRepository.js";

export const createClientGuarantorDetails = async (req, res) => {
  try {
    const {
      customerId,
      guarantorName,
      spouseName,
      fatherName,
      motherName,
      relation,
      dateOfBirth,
      age,
      grMobileNo1,
      grMobileNo2,
      grAddress,
      grIsOwned,
      grIsRented,
    } = req.body;

    const guarantorId = nanoid(10); // Generating a 10-character ID using nanoid
    const result = await clientGuarantorRepository.createClientGuarantorDetails(
      guarantorId,
      customerId,
      guarantorName,
      spouseName,
      fatherName,
      motherName,
      relation,
      dateOfBirth,
      age,
      grMobileNo1,
      grMobileNo2,
      grAddress,
      grIsOwned,
      grIsRented
    );

    res.status(StatusCodes.CREATED).json({
      message: "Client guarantor details created successfully",
      guarantorId,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating client guarantor details",
      error: error.message,
    });
  }
};

export const getAllClientGuarantorDetails = async (req, res) => {
  try {
    const result =
      await clientGuarantorRepository.getAllClientGuarantorDetails();
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client guarantor details",
      error: error.message,
    });
  }
};

export const getClientGuarantorById = async (req, res) => {
  try {
    const { guarantorId } = req.params;
    const result = await clientGuarantorRepository.getClientGuarantorById(
      guarantorId
    );
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client guarantor details not found" });
    }
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client guarantor details",
      error: error.message,
    });
  }
};

export const updateClientGuarantorById = async (req, res) => {
  try {
    const { guarantorId } = req.params;
    const updatedFields = req.body;
    const result = await clientGuarantorRepository.updateClientGuarantorById(
      guarantorId,
      updatedFields
    );

    console.log(result);
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client guarantor details not found or not updated" });
    }

    const updatedDetails =
      await clientGuarantorRepository.getClientGuarantorById(guarantorId);

    res.status(StatusCodes.OK).json({
      message: "Client guarantor details updated successfully",
      updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating client guarantor details",
      error: error.message,
    });
  }
};

export const deleteClientGuarantorById = async (req, res) => {
  try {
    const { guarantorId } = req.params;
    const result = await clientGuarantorRepository.deleteClientGuarantorById(
      guarantorId
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client guarantor details not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Client guarantor details deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting client guarantor details",
      error: error.message,
    });
  }
};
