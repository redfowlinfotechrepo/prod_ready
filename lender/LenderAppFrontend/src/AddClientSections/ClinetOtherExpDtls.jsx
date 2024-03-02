import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid, Alert, Button } from "@mui/material";
import axios from "axios";

const ClinetOtherExpDtls = () => {
  const [clLoan, setClLoan] = useState();
  const [clEducation, setClEducation] = useState();
  const [clRent, setClRent] = useState();
  const [clMedical, setClMedical] = useState();
  const [clOthers, setClOthers] = useState();
  const [clTotal, setClTotal] = useState();
  const [clTotalIncome, setClTotalIncome] = useState();
  const [clTotalExpenses, setClTotalExpenses] = useState();
  const [clBalance, setClBalance] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [dataExists, setDataExists] = useState({});

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const houseHoldId = localStorage.getItem("HouseHoldId");
  const customerId = localStorage.getItem("CustomerId");
  const flag = localStorage.getItem("flag");

  const initialiseGuarantorDtls = async (customerId) => {
    try {
      const GuarantorDtls = {
        customerId: customerId,
      };
      const response = await axios.post(
        "/api/v1/client/guarantor/createClientGuarantorDetails",
        GuarantorDtls
      );
      localStorage.setItem("GuarantorId", response.data.guarantorId);
      setSuccessMessage("Guarantor Details Initialized");
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessage(
        "Guarantor Details not initialized.Do not proceed further. Please contact the developer"
      );
      setShowAlert(true);
    }
  };

  const handleSaveData = async () => {
    // Create an object to hold all the data
    const clientOtherDtls = {
      Loan: clLoan,
      Education: clEducation,
      Rent: clRent,
      Medical: clMedical,
      Others: clOthers,
      Total: clTotal,
      TotalIncome: clTotalIncome,
      TotalExpenses: clTotalExpenses,
      Balance: clBalance,
      customerId: customerId,
    };
    console.log(clientOtherDtls);
    try {
      const response = await axios.patch(
        `/api/v1/client/household/updateClientHouseHoldById/${houseHoldId}`,
        clientOtherDtls
      );
      console.log(response.data);
      localStorage.setItem("flag", 4);
      setIsSaved(true);
      await initialiseGuarantorDtls(customerId);
      setSuccessMessage(
        "Client House Hold Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleUpdateData = async () => {
    // Create an object to hold all the data
    const clientOtherDtls = {
      Loan: clLoan,
      Education: clEducation,
      Rent: clRent,
      Medical: clMedical,
      Others: clOthers,
      Total: clTotal,
      TotalIncome: clTotalIncome,
      TotalExpenses: clTotalExpenses,
      Balance: clBalance,
      customerId: customerId,
    };
    console.log(houseHoldId);
    try {
      const response = await axios.patch(
        `/api/v1/client/household/updateClientHouseHoldById/${houseHoldId}`,
        clientOtherDtls
      );
      console.log(response.data);
      setIsSaved(true);
      setSuccessMessage(
        "Client Bank Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const setFormData = async (houseHoldId) => {
    try {
      const response = await axios.get(
        `api/v1/client/household/getHouseHoldDtlsById/${houseHoldId}`
      );
      const dataExists = response.data.clientHouseHold;

      setClLoan(dataExists.Loan || "");
      setClEducation(dataExists.Education || "");
      setClRent(dataExists.Rent || "");
      setClMedical(dataExists.Medical || "");
      setClOthers(dataExists.Others || "");
      setClTotal(dataExists.Total || "");
      setClTotalIncome(dataExists.TotalIncome || "");
      setClTotalExpenses(dataExists.TotalExpenses || "");
      setClBalance(dataExists.Balance || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const houseHoldId = localStorage.getItem("HouseHoldId");
    if (houseHoldId && flag >= 4) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(houseHoldId);
    }
  }, []);

  return (
    <>
      <Box p={5} id="client-bank-details">
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {/* Education Amount */}
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
                  Education Amount
                </Typography>
                <TextField
                  type="number"
                  label="Education Amount"
                  value={clEducation}
                  onChange={(e) => setClEducation(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>

              {/* Rent Amount */}
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
                  Rent Amount
                </Typography>
                <TextField
                  type="number"
                  label="Rent Amount"
                  value={clRent}
                  onChange={(e) => setClRent(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>

              {/* Total Income*/}
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
                  Total Income
                </Typography>
                <TextField
                  type="number"
                  label="Total Income"
                  value={clTotal}
                  onChange={(e) => setClTotal(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right column */}
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {/* Others */}
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
                  Others
                </Typography>
                <TextField
                  type="number"
                  label="Others"
                  value={clOthers}
                  onChange={(e) => setClOthers(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>
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
                  Medical Expenses
                </Typography>
                <TextField
                  type="number"
                  label="Medical Expenses"
                  value={clMedical}
                  onChange={(e) => setClMedical(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Calculate Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "5px",
          }}
        >
          <Button variant="outlined">Calculate</Button>
        </Box>

        {/* Calculated Amount  */}
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {/* Total Amount */}
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
                  Total Amount
                </Typography>
                <TextField
                  type="number"
                  label="Total Amount"
                  value={clTotal}
                  onChange={(e) => setClTotal(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>

              {/* Total Expenses Amount */}
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
                  Total Expenses Amount
                </Typography>
                <TextField
                  type="number"
                  label="Total Expenses Amount"
                  value={clTotalExpenses}
                  onChange={(e) => setClTotalExpenses(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right column */}
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {/* Balance Amount */}
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
                  Balance Amount
                </Typography>
                <TextField
                  type="number"
                  label="Balance Amount"
                  value={clBalance}
                  onChange={(e) => setClBalance(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
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

export default ClinetOtherExpDtls;
