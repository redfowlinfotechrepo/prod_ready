import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

const ClientBankDtls = ({ activeStep }) => {
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankName, setBankName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isExists, setIsExists] = useState(false);
  const [dataExists, setDataExists] = useState({});

  const bankId = localStorage.getItem("BankDtlsId");
  const customerId = localStorage.getItem("CustomerId");
  const flag = localStorage.getItem("flag");

  const initialiseHouseholdDtls = async (customerId) => {
    try {
      const houseHoldDetails = {
        customerId: customerId,
      };
      const response = await axios.post(
        "/api/v1/client/household/createHouseHoldDtls",
        houseHoldDetails
      );
      localStorage.setItem("HouseHoldId", response.data.id);
      setSuccessMessage("Other Details Initialized");
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessage(
        "Other Details not initialized.Do not proceed further. Please contact the developer"
      );
      setShowAlert(true);
    }
  };

  const handleSaveData = async () => {
    // Create an object to hold all the data
    const clientBankDtls = {
      AccountNo: accountNo,
      IFSC: ifsc,
      BranchName: branchName,
      BankName: bankName,
    };
    console.log(bankId);
    try {
      const response = await axios.patch(
        `/api/v1/client/bankdetails/updateClientBankDetailsById/${bankId}`,
        clientBankDtls
      );
      console.log(response.data);
      localStorage.setItem("flag", 3);
      setIsSaved(true);
      await initialiseHouseholdDtls(customerId);
      setSuccessMessage(
        "Client Bank Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleUpdateData = async () => {
    // Create an object to hold all the data
    const clientBankDtls = {
      AccountNo: accountNo,
      IFSC: ifsc,
      BranchName: branchName,
      BankName: bankName,
    };
    console.log(bankId);
    try {
      const response = await axios.patch(
        `/api/v1/client/bankdetails/updateClientBankDetailsById/${bankId}`,
        clientBankDtls
      );
      console.log(response.data);
      setSuccessMessage(
        "Client Bank Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const setFormData = async (bankId) => {
    try {
      const response = await axios.get(
        `/api/v1/client/bankdetails/getClientBankDetailsById/${bankId}`
      );
      const dataExists = response.data.result;

      setAccountNo(dataExists.AccountNo || "");
      setIfsc(dataExists.IFSC || "");
      setBranchName(dataExists.BranchName || "");
      setBankName(dataExists.BankName || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const bankId = localStorage.getItem("BankDtlsId");
    if (bankId && flag >= 3) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(bankId);
    }
  }, []);

  return (
    <>
      <Box p={5} id="client-bank-details">
        {/* Account Details */}
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, fontWeight: "bold" }}
          >
            Account Number
          </Typography>
          <TextField
            label="Account Number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px" }}
          />
        </Box>

        {/* IFSC Details  */}
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, fontWeight: "bold" }}
          >
            IFSC
          </Typography>
          <TextField
            label="IFSC Details"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px" }}
          />
        </Box>

        {/* Branch Name */}
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, fontWeight: "bold" }}
          >
            Bank's Branch Name
          </Typography>
          <TextField
            label="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px" }}
          />
        </Box>

        {/* Bank Name */}
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, fontWeight: "bold" }}
          >
            Bank's Name
          </Typography>
          <TextField
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px" }}
          />
        </Box>
      </Box>
      {showAlert && <Alert severity="error">{alertMessage}</Alert>}
      {showSuccess && <Alert severity="success">{successMessage}</Alert>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "5px",
        }}
      >
        {console.log(isSaved)}
        {!isSaved ? (
          <Button variant="outlined" onClick={handleSaveData}>
            Save Data
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleUpdateData}>
            Update Data
          </Button>
        )}
      </Box>
    </>
  );
};

export default ClientBankDtls;
