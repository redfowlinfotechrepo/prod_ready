import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid, Alert, Button } from "@mui/material";
import axios from "axios";

const ClientVerificationDtls = () => {
  const [clSmartCard, setClSmartCard] = useState("");
  const [clAadharCard, setClAadharCard] = useState("");
  const [clVoterId, setClVoterId] = useState("");
  const [clPanCard, setClPanCard] = useState("");
  const [clOthers1, setClOthers1] = useState("");
  const [clOthers2, setClOthers2] = useState("");
  const [grSmartCard, setGrSmartCard] = useState("");
  const [grAadharCard, setGrAadharCard] = useState("");
  const [grVoterId, setGrVoterId] = useState("");
  const [grPanCard, setGrPanCard] = useState("");
  const [grOthers1, setGrOthers1] = useState("");
  const [grOthers2, setGrOthers2] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [dataExists, setDataExists] = useState({});

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const verificationId = localStorage.getItem("VerificationId");
  const customerId = localStorage.getItem("CustomerId");
  const flag = localStorage.getItem("flag");

  const handleSaveData = async () => {
    // Create an object to hold all the data
    const clientVerificationDtls = {
      GrSmartCard: grSmartCard,
      GrAadharCard: grAadharCard,
      GrPanCard: grPanCard,
      GrVoterId: clVoterId,
      GrOthers1: grOthers1,
      GrOthers2: grOthers2,
      ClSmartCard: clSmartCard,
      ClAadharCard: clAadharCard,
      ClVoterId: clVoterId,
      ClPanCard: clPanCard,
      ClOthers1: clOthers1,
      ClOthers2: clOthers2,
      customerId: customerId,
    };

    try {
      const response = await axios.patch(
        `/api/v1/client/verification/updateVerification/${verificationId}`,
        clientVerificationDtls
      );
      localStorage.setItem("flag", 6);
      setIsSaved(true);
      setSuccessMessage(
        "Client Verification Details Updated Successfully. All Details Saved Successfully."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleUpdateData = async () => {
    // Create an object to hold all the data
    const clientVerificationDtls = {
      GrSmartCard: grSmartCard,
      GrAadharCard: grAadharCard,
      GrPanCard: grPanCard,
      GrVoterId: clVoterId,
      GrOthers1: grOthers1,
      GrOthers2: grOthers2,
      ClSmartCard: clSmartCard,
      ClAadharCard: clAadharCard,
      ClVoterId: clVoterId,
      ClPanCard: clPanCard,
      ClOthers1: clOthers1,
      ClOthers2: clOthers2,
      customerId: customerId,
    };

    try {
      const response = await axios.patch(
        `/api/v1/client/household/updateClientHouseHoldById/${verificationId}`,
        clientVerificationDtls
      );
      setIsSaved(true);
      setSuccessMessage(
        "Client Verification Details Updated Successfully. Client Data Received."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const setFormData = async (verificationId) => {
    try {
      const response = await axios.get(
        `api/v1/client/verification/getVerificationById/${verificationId}`
      );
      const dataExists = response.data.clientVerification;

      setClSmartCard(dataExists.ClSmartCard || "");
      setClAadharCard(dataExists.ClAadharCard || "");
      setClVoterId(dataExists.ClVoterId || "");
      setClPanCard(dataExists.ClPanCard || "");
      setClOthers1(dataExists.ClOthers1 || "");
      setClOthers2(dataExists.ClOthers2 || "");
      setGrSmartCard(dataExists.GrSmartCard || "");
      setGrAadharCard(dataExists.GrAadharCard || "");
      setGrVoterId(dataExists.GrVoterId || "");
      setGrPanCard(dataExists.GrPanCard || "");
      setGrOthers1(dataExists.GrOthers1 || "");
      setGrOthers2(dataExists.GrOthers2 || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const verificationId = localStorage.getItem("VerificationId");
    if (verificationId && flag >= 6) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(verificationId);
    }
  }, []);

  return (
    <>
      <Box
        p={5}
        id="client-id-details"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
                marginRight: "10px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Client Details
              </Typography>
              <TextField
                label="Aadhar Card No"
                value={clAadharCard}
                onChange={(e) => setClAadharCard(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Voter ID No"
                value={clVoterId}
                onChange={(e) => setClVoterId(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="PAN Card No"
                value={clPanCard}
                onChange={(e) => setClPanCard(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Other 1"
                value={clOthers1}
                onChange={(e) => setClOthers1(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Other 2"
                value={clOthers2}
                onChange={(e) => setClOthers2(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              {/* Other fields */}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                borderLeft: "1px solid #ccc",
                paddingLeft: "10px",
                marginLeft: "10px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Guarantor Details
              </Typography>
              <TextField
                label="Aadhar Card No"
                value={grAadharCard}
                onChange={(e) => setGrAadharCard(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Voter ID No"
                value={grVoterId}
                onChange={(e) => setGrVoterId(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="PAN Card No"
                value={grPanCard}
                onChange={(e) => setGrPanCard(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Other 1"
                value={grOthers1}
                onChange={(e) => setGrOthers1(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Other 2"
                value={grOthers2}
                onChange={(e) => setGrOthers2(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              {/* Other fields */}
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

export default ClientVerificationDtls;
