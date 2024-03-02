import { StatusCodes } from "http-status-codes";
import * as clientPersonalDtlsRepository from "../repository/clientPersonalDtlsRepository.js";
import { nanoid } from "nanoid";

const generateUniqueIdentifier = () => {
  const randomDigits = nanoid(5);
  return `CL${randomDigits}`;
};

export const createClientPersonalDetails = async (req, res) => {
  try {
    const {
      centerId,
      customerName,
      spouseName,
      fatherName,
      motherName,
      dateOfBirth,
      age,
      address,
      residenceCustYr,
      mobileNo1,
      mobileNo2,
      isTatchedHouse,
      isRoofTiles,
      isMetalsheets,
      isCementSheetsRoof,
      isCementConcreteCeil,
      isHindu,
      isMuslim,
      isChristian,
      isOthers,
      isMarried,
      isSingle,
      isWidow,
      isDivorced,
      isSeparate,
      isOwned,
      isRented,
      SalesExecID,
    } = req.body;

    const customerId = generateUniqueIdentifier();

    const result =
      await clientPersonalDtlsRepository.createClientPersonalDetails(
        centerId,
        customerId,
        customerName,
        spouseName,
        fatherName,
        motherName,
        dateOfBirth,
        age,
        address,
        residenceCustYr,
        mobileNo1,
        mobileNo2,
        isTatchedHouse,
        isRoofTiles,
        isMetalsheets,
        isCementSheetsRoof,
        isCementConcreteCeil,
        isHindu,
        isMuslim,
        isChristian,
        isOthers,
        isMarried,
        isSingle,
        isWidow,
        isDivorced,
        isSeparate,
        isOwned,
        isRented,
        SalesExecID
      );

    res.status(StatusCodes.CREATED).json({
      message: "Client personal details created successfully",
      customerId,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating client personal details",
      error: error.message,
    });
  }
};

export const getAllClientPersonalDetails = async (req, res) => {
  try {
    const { MobileNo1, salesExecID } = req.query;

    const { clients, count } =
      await clientPersonalDtlsRepository.getAllClientPersonalDetails({
        MobileNo1,
        salesExecID,
      });
    const responseMessage = `Retrieved ${count} clients`;

    res
      .status(StatusCodes.OK)
      .json({ message: responseMessage, clients, count });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client personal details",
      error: error.message,
    });
  }
};

export const getClientPersonalDetailsById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const clientPersonal =
      await clientPersonalDtlsRepository.getClientPersonalById(customerId);

    if (!clientPersonal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client personal details not found" });
    }

    res.status(StatusCodes.OK).json({
      message: "Client personal details retrieved successfully",
      clientPersonal,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving client personal details",
      error: error.message,
    });
  }
};

export const updateClientPersonalDetailsById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const updatedFields = req.body;

    const updated = await clientPersonalDtlsRepository.updateClientPersonalById(
      customerId,
      updatedFields
    );

    if (!updated) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client personal details not found or not updated" });
    }

    // Fetch updated details
    const updatedDetails =
      await clientPersonalDtlsRepository.getClientPersonalById(customerId);

    res.status(StatusCodes.OK).json({
      message: "Client personal details updated successfully",
      updatedDetails,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "INTERNAL_SERVER_ERROR",
      error: error.message,
    });
  }
};

export const deleteClientPersonalDetailsById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const result = await clientPersonalDtlsRepository.deleteClientPersonalById(
      customerId
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Client personal details not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Client personal details deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting client personal details",
      error: error.message,
    });
  }
};
