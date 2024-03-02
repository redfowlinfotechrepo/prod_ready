import { StatusCodes } from "http-status-codes";
import * as familyRepository from "../repository/clientFamilyDetailsRepository.js";
import { nanoid } from "nanoid";

const generateUniqueIdentifier = () => {
  const randomDigits = nanoid(5);
  return `FAM${randomDigits}`;
};

export const createFamilyMember = async (req, res) => {
  try {
    const {
      clientId,
      member1,
      relation1,
      age1,
      occupation1,
      education1,
      income1,
      member2,
      relation2,
      age2,
      occupation2,
      education2,
      income2,
      member3,
      relation3,
      age3,
      occupation3,
      education3,
      income3,
      member4,
      relation4,
      age4,
      occupation4,
      education4,
      income4,
      member5,
      relation5,
      age5,
      occupation5,
      education5,
      income5,
    } = req.body;

    const id = generateUniqueIdentifier();

    const result = await familyRepository.createFamilyMember(
      id,
      clientId,
      member1,
      relation1,
      age1,
      occupation1,
      education1,
      income1,
      member2,
      relation2,
      age2,
      occupation2,
      education2,
      income2,
      member3,
      relation3,
      age3,
      occupation3,
      education3,
      income3,
      member4,
      relation4,
      age4,
      occupation4,
      education4,
      income4,
      member5,
      relation5,
      age5,
      occupation5,
      education5,
      income5
    );

    res.status(StatusCodes.CREATED).json({
      message: "Family member created successfully",
      result,
      id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating family member",
      error: error.message,
    });
  }
};

export const getAllFamilyMembers = async (req, res) => {
  try {
    const { clientId } = req.query;
    const result = await familyRepository.getAllFamilyMembers(clientId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving family members",
      error: error.message,
    });
  }
};

export const getFamilyMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await familyRepository.getFamilyMemberById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Family member not found" });
    }

    res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving family member",
      error: error.message,
    });
  }
};

export const updateFamilyMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await familyRepository.updateFamilyMemberById(
      id,
      updatedFields
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Family member not found or not updated",
        result: result,
      });
    }

    const updatedMember = await familyRepository.getFamilyMemberById(id);
    res.status(StatusCodes.OK).json({
      message: "Family member updated successfully",
      result: updatedMember,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating family member",
      error: error.message,
    });
  }
};

export const deleteFamilyMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await familyRepository.deleteFamilyMemberById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Family member not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Family member deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting family member",
      error: error.message,
    });
  }
};
