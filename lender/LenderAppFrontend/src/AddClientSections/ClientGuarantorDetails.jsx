import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";

const ClientGuarantorDetails = () => {
  const [guarantorName, setGuarantorName] = useState("");
  const [grSpouseName, setGrSpouseName] = useState("");
  const [grFatherName, setGrFatherName] = useState("");
  const [grMotherName, setGrMotherName] = useState("");
  const [grRelation, setGrRelation] = useState("");
  const [grDateOfBirth, setGrDateOfBirth] = useState();
  const [grAge, setGrAge] = useState();
  const [grMobileNo1, setGrMobileNo1] = useState("");
  const [grMobileNo2, setGrMobileNo2] = useState("");
  const [grAddress, setGrAddress] = useState("");
  const [grIsOwned, setGrIsOwned] = useState(false);
  const [grIsRented, setGrIsRented] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [dataExists, setDataExists] = useState({});

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const guarantorId = localStorage.getItem("GuarantorId");
  const customerId = localStorage.getItem("CustomerId");
  const flag = localStorage.getItem("flag");

  const initialiseVerificationDtls = async (customerId) => {
    try {
      const VerificationDtls = {
        customerId: customerId,
      };
      const response = await axios.post(
        "/api/v1/client/verification/createVerification",
        VerificationDtls
      );
      localStorage.setItem("VerificationId", response.data.id);
      setSuccessMessage("Verification Details Initialized");
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessage(
        "Verification Details not initialized.Do not proceed further. Please contact the developer"
      );
      setShowAlert(true);
    }
  };

  const handleSaveData = async () => {
    try {
      const clientGuarantorDtls = {
        GuarantorName: guarantorName,
        SpouseName: grSpouseName,
        FatherName: grFatherName,
        MotherName: grMotherName,
        Relation: grRelation,
        DateOfBirth: grDateOfBirth,
        Age: grAge,
        GrMobileNo1: grMobileNo1,
        GrMobileNo2: grMobileNo2,
        GrAddress: grAddress,
        GrIsOwned: grIsOwned,
        GrIsRented: grIsRented,
        customerId: customerId,
      };

      const response = await axios.patch(
        `/api/v1/client/guarantor/updateClientGuarantorById/${guarantorId}`,
        clientGuarantorDtls
      );
      localStorage.setItem("flag", 5);
      initialiseVerificationDtls(customerId);
      setIsSaved(true);

      setSuccessMessage(
        "Client Guarantor Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating client guarantor details:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      console.log("Updating Client House Hold Details...");

      const clientGuarantorDtls = {
        GuarantorName: guarantorName,
        SpouseName: grSpouseName,
        FatherName: grFatherName,
        MotherName: grMotherName,
        Relation: grRelation,
        DateOfBirth: grDateOfBirth,
        Age: grAge,
        GrMobileNo1: grMobileNo1,
        GrMobileNo2: grMobileNo2,
        GrAddress: grAddress,
        GrIsOwned: grIsOwned,
        GrIsRented: grIsRented,
        customerId: customerId,
      };

      console.log("Client Guarantor Details:", clientGuarantorDtls);

      const response = await axios.patch(
        `/api/v1/client/guarantor/updateClientGuarantorById/${guarantorId}`,
        clientGuarantorDtls
      );

      setIsSaved(true);
      setSuccessMessage(
        "Client Guarantor Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating client guarantor details:", error);
    }
  };

  const setFormData = async (guarantorId) => {
    try {
      const response = await axios.get(
        `api/v1/client/guarantor/getClientGuarantorById/${guarantorId}`
      );
      const dataExists = response.data.result;

      setGuarantorName(dataExists.GuarantorName || "");
      setGrSpouseName(dataExists.SpouseName || "");
      setGrFatherName(dataExists.FatherName || "");
      setGrMotherName(dataExists.MotherName || "");
      setGrRelation(dataExists.Relation || "");
      setGrDateOfBirth(dataExists.DateOfBirth || "");
      setGrAge(dataExists.Age || "");
      setGrMobileNo1(dataExists.GrMobileNo1 || "");
      setGrMobileNo2(dataExists.GrMobileNo2 || "");
      setGrAddress(dataExists.GrAddress || "");
      setGrIsRented(dataExists.GrIsRented || "");
      setGrIsOwned(dataExists.GrIsOwned || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const guarantorId = localStorage.getItem("GuarantorId");
    if (guarantorId && flag >= 5) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(guarantorId);
    }
  }, []);

  return (
    <>
      <Box p={5} id="client-guarantor-details">
        {/* Guarantor Personal Info */}
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
            Personal Information
          </Typography>
          {/* ... (Existing code for Personal Information) */}
          <TextField
            label="Relation with Client"
            value={grRelation}
            onChange={(e) => setGrRelation(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px" }}
          />
          <br />
          <TextField
            label="Guarantor Name"
            value={guarantorName}
            onChange={(e) => setGuarantorName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Guarantor's Spouse Name"
            value={grSpouseName}
            onChange={(e) => setGrSpouseName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Guarantor's Father Name"
            value={grFatherName}
            onChange={(e) => setGrFatherName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Guarantor's Mother Name"
            value={grMotherName}
            onChange={(e) => setGrMotherName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="date"
            label="Date of Birth"
            value={grDateOfBirth}
            onChange={(e) => setGrDateOfBirth(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "200px", marginRight: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            label="Age"
            value={grAge}
            onChange={(e) => setGrAge(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ width: "200px", marginRight: "10px" }}
          />
        </Box>
        {/* Address */}
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          {/* ... (Existing code for Address) */}
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, fontWeight: "bold" }}
          >
            Address
          </Typography>
          <TextField
            label="Address"
            multiline
            rows={4} // Adjust the number of rows as needed
            value={grAddress}
            onChange={(e) => setGrAddress(e.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth // Takes the full width of the container
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={grIsOwned} // Use the state directly for checked property
                onChange={(e) => setGrIsOwned(e.target.checked)} // Update the state directly with the checked value
                name="grIsOwned"
              />
            }
            label="Owned"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={grIsRented} // Use the state directly for checked property
                onChange={(e) => setGrIsRented(e.target.checked)} // Update the state directly with the checked value
                name="isRented"
              />
            }
            label="Rented"
          />
        </Box>
        {/* Mobile Number */}
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
            Contact
          </Typography>

          <TextField
            type="number"
            label="Mobile Number"
            value={grMobileNo1}
            onChange={(e) => setGrMobileNo1(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Alternate Mobile Number"
            value={grMobileNo2}
            onChange={(e) => setGrMobileNo2(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
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

export default ClientGuarantorDetails;
