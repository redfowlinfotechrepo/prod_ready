import { StatusCodes } from "http-status-codes";
import * as transactionLogsRepository from "../repository/transactionLogsRepository.js";
import { nanoid } from "nanoid";

const generateUniqueIdentifier = () => {
  const randomDigits = nanoid(5);
  return `TRAN${randomDigits}`;
};

export const createTransactionLog = async (req, res) => {
  try {
    const {
      date,
      amount,
      typeOfTrans,
      investorId,
      centerId,
      salesExecId,
      clientId,
      modeOfTrans,
    } = req.body;
    const transId = generateUniqueIdentifier(); // Generating a unique ID using nanoid

    const result = await transactionLogsRepository.createTransactionLog(
      transId,
      date,
      amount,
      typeOfTrans,
      investorId,
      centerId,
      salesExecId,
      clientId,
      modeOfTrans
    );

    res.status(StatusCodes.CREATED).json({
      message: "Transaction log created successfully",
      result,
      transId,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating transaction log",
      error: error.message,
    });
  }
};

export const getAllTransactionLogs = async (req, res) => {
  try {
    const { date, typeOfTrans, investorId, centerId, salesExecId, clientId } =
      req.query;

    const result = await transactionLogsRepository.getAllTransactionLogs({
      date,
      typeOfTrans,
      investorId,
      centerId,
      salesExecId,
      clientId,
    });

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving transaction logs",
      error: error.message,
    });
  }
};

export const getTransactionLogById = async (req, res) => {
  try {
    const { transId } = req.params;
    const result = await transactionLogsRepository.getTransactionLogById(
      transId
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Transaction log not found" });
    }

    res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving transaction log",
      error: error.message,
    });
  }
};

export const updateTransactionLogById = async (req, res) => {
  try {
    const { transId } = req.params;
    const updatedFields = req.body;
    const result = await transactionLogsRepository.updateTransactionLogById(
      transId,
      updatedFields
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Transaction log not found or not updated",
        result: result,
      });
    }

    const updatedLog = await transactionLogsRepository.getTransactionLogById(
      transId
    );
    res.status(StatusCodes.OK).json({
      message: "Transaction log updated successfully",
      result: updatedLog,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating transaction log",
      error: error.message,
    });
  }
};

export const deleteTransactionLogById = async (req, res) => {
  try {
    const { transId } = req.params;
    const result = await transactionLogsRepository.deleteTransactionLogById(
      transId
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Transaction log not found or not deleted" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Transaction log deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting transaction log",
      error: error.message,
    });
  }
};
