import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import Select from "react-select";
import { AlignHorizontalLeftSharp } from "@mui/icons-material";

const ClientPersonalInfo = ({ activeStep }) => {
  const [centerName, setCenterName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [isTatchedHouse, setIsTatchedHouse] = useState(false);
  const [isRoofTiles, setIsRoofTiles] = useState(false);
  const [isMetalsheetsRoof, setIsMetalsheetsRoof] = useState(false);
  const [isCementSheetsRoof, setIsCementSheetsRoof] = useState(false);
  const [isCementConcreteCeil, setIsCementConcreteCeil] = useState(false);
  const [isHindu, setIsHindu] = useState(false);
  const [isMuslim, setIsMuslim] = useState(false);
  const [isChristian, setIsChristian] = useState(false);
  const [isOthers, setIsOthers] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const [isWidow, setIsWidow] = useState(false);
  const [isDivorced, setIsDivorced] = useState(false);
  const [isSeparate, setIsSeparate] = useState(false);
  const [address, setAddress] = useState("");
  const [isOwned, setIsOwned] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [residenceCustYr, setResidenceCustYr] = useState("");
  const [mobileNo1, setMobileNo1] = useState("");
  const [mobileNo2, setMobileNo2] = useState("");
  const [SalesExecID, setSalesExecID] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [dataExists, setDataExists] = useState({});

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  //for center selection
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [listOfCenters, setListOfCenters] = useState([]);

  //to fetch list of centers
  const fetchListOfCenters = async () => {
    const response = await axios.get("/api/v1/center/getAllCenterDetails");
    if (Array.isArray(response.data.centers)) {
      setListOfCenters(response.data.centers);
    } else {
      console.error("Invalid response data format:", response.data.centers);
    }
  };

  //CenterOptions format
  const CenterOptions = listOfCenters.map((center) => ({
    value: center.id,
    label: center.centerName, // Adjust this based on your data structure
  }));

  const handleCenterSelect = (selectedOption) => {
    setSelectedCenter(selectedOption);
  };

  //To initalise Family Details
  const initialiseFamilyDtls = async (customerId) => {
    try {
      const familyDtls = {
        clientId: customerId,
      };
      const response = await axios.post(
        "/api/v1/client/family/createFamilyMember",
        familyDtls
      );
      localStorage.setItem("familyId", response.data.id);
      setSuccessMessage("Family Details Initialized");
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessage(
        "Family Details not initialized. Please contact the developer"
      );
      setShowAlert(true);
    }
  };

  //Handle ClientPersonal Save
  const handleSaveData = async () => {
    setSalesExecID(localStorage.getItem("id"));

    const clientPersonalData = {
      centerId: selectedCenter.label,
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
      isMetalsheets: isMetalsheetsRoof,
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
      SalesExecID: localStorage.getItem("SalesExecId"), // Corrected assignment
      // ... add other fields here
    };

    try {
      // Perform action to save data here (e.g., send to API, update state, etc.)
      const flag = await axios.get(
        `/api/v1/client/getAllClientPersonalDetails?MobileNo1=${clientPersonalData.mobileNo1}`,
        clientPersonalData
      );

      if (flag.data.count === 0) {
        const response = await axios.post(
          "/api/v1/client/createClientPersonalDetails",
          clientPersonalData
        );

        setCustomerId(response.data.customerId);
        const familyDtls = await initialiseFamilyDtls(response.data.customerId);
        localStorage.setItem("CustomerId", response.data.customerId);
        localStorage.setItem("flag", 1);
        setIsSaved(true);
        setSuccessMessage("Client Created Successfully. Proceed Further.");
      } else {
        setAlertMessage("Client Already registered with this Phone Number.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  //Handle ClientPersonal Update
  const handleUpdateData = async () => {
    setSalesExecID(localStorage.getItem("id"));

    const clientPersonalData = {
      centerId: selectedCenter.value,
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
      isMetalsheets: isMetalsheetsRoof,
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
      SalesExecID: localStorage.getItem("id"), // Corrected assignment
      // ... add other fields here
    };
    console.log("clientPersonalData: ", clientPersonalData);

    try {
      const response = await axios.patch(
        `/api/v1/client/updateClientPersonalDetailsById/${customerId}`,
        clientPersonalData
      );
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage("Data Updated Successfully");
        setShowSuccess(true);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  //Set Data if available
  const setFormData = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/v1/client/getClientPersonalDetailsById/${customerId}`
      );

      const dataExists = response.data.clientPersonal;
      console.log(dataExists);
      const selectedCenterOption = CenterOptions.find(
        (option) => option.value === dataExists.centerId
      );
      // console.log("yes:", selectedCenterOption);

      setSelectedCenter(selectedCenterOption);
      setCustomerId(dataExists.CustomerId || "");
      setCustomerName(dataExists.CustomerName || "");
      setSpouseName(dataExists.SpouseName || "");
      setFatherName(dataExists.FatherName || "");
      setMotherName(dataExists.MotherName || "");
      setDateOfBirth(dataExists.DateOfBirth || "");
      setAge(dataExists.Age || "");
      setIsTatchedHouse(Boolean(dataExists.isTatchedHouse));
      setIsRoofTiles(Boolean(dataExists.isRoofTiles));
      setIsMetalsheetsRoof(Boolean(dataExists.isMetalsheets));
      setIsCementSheetsRoof(Boolean(dataExists.isCementSheetsRoof));
      setIsCementConcreteCeil(Boolean(dataExists.isCementConcreteCeil));
      setIsHindu(Boolean(dataExists.isHindu));
      setIsMuslim(Boolean(dataExists.isMuslim));
      setIsChristian(Boolean(dataExists.isChristian));
      setIsOthers(Boolean(dataExists.isOthers));
      setIsMarried(Boolean(dataExists.isMarried));
      setIsSingle(Boolean(dataExists.isSingle));
      setIsWidow(Boolean(dataExists.isWidow));
      setIsDivorced(Boolean(dataExists.isDivorced));
      setIsSeparate(Boolean(dataExists.isSeparate));
      setAddress(dataExists.Address || "");
      setIsOwned(Boolean(dataExists.isOwned));
      setIsRented(Boolean(dataExists.isRented));
      setResidenceCustYr(dataExists.ResidenceCustYr || "");
      setMobileNo1(dataExists.MobileNo1 || "");
      setMobileNo2(dataExists.MobileNo2 || "");
      setSalesExecID(dataExists.SalesExecID || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListOfCenters();
    const customerId = localStorage.getItem("CustomerId");
    if (customerId) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(customerId);
    }
  }, []);

  return (
    <>
      <Box p={5} id="client-personal-info">
        {/* Personal info */}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: "250px",
                  height: "50px",
                  zIndex: "0",
                }),
                provided: (baseStyles) => ({
                  ...baseStyles,
                  zIndex: "9999 !important",
                }),
              }}
              value={selectedCenter} // Ensure 'value' is being set correctly
              onChange={handleCenterSelect}
              options={CenterOptions}
              placeholder="Select Center"
            />
          </Box>
          <br />
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Spouse Name"
            value={spouseName}
            onChange={(e) => setSpouseName(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Father Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Mother Name"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="date"
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
          />
        </Box>
        <br />
        {/* House Status */}
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
            House Status
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTatchedHouse} // Use the state directly for checked property
                onChange={(e) => setIsTatchedHouse(e.target.checked)} // Update the state directly with the checked value
                name="isTatchedHouse"
              />
            }
            label="Tatched House"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRoofTiles} // Use the state directly for checked property
                onChange={(e) => setIsRoofTiles(e.target.checked)} // Update the state directly with the checked value
                name="isRoofTiles"
              />
            }
            label="Roof Tiled"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isMetalsheetsRoof} // Use the state directly for checked property
                onChange={(e) => setIsMetalsheetsRoof(e.target.checked)} // Update the state directly with the checked value
                name="isMetalsheetsRoof"
              />
            }
            label="Metal Sheet Roof"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCementSheetsRoof} // Use the state directly for checked property
                onChange={(e) => setIsCementSheetsRoof(e.target.checked)} // Update the state directly with the checked value
                name="isCementSheetsRoof"
              />
            }
            label="Cement Sheet Roof"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCementConcreteCeil} // Use the state directly for checked property
                onChange={(e) => setIsCementConcreteCeil(e.target.checked)} // Update the state directly with the checked value
                name="isCementConcreteCeil"
              />
            }
            label="Cement Concrete Ceiling"
          />
        </Box>
        {/* Religion */}
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
            Religion
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isHindu} // Use the state directly for checked property
                onChange={(e) => setIsHindu(e.target.checked)} // Update the state directly with the checked value
                name="isHindu"
              />
            }
            label="Hindu"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isMuslim} // Use the state directly for checked property
                onChange={(e) => setIsMuslim(e.target.checked)} // Update the state directly with the checked value
                name="isMuslim"
              />
            }
            label="Muslim"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChristian} // Use the state directly for checked property
                onChange={(e) => setIsChristian(e.target.checked)} // Update the state directly with the checked value
                name="isChristian"
              />
            }
            label="Muslim"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isOthers} // Use the state directly for checked property
                onChange={(e) => setIsOthers(e.target.checked)} // Update the state directly with the checked value
                name="isOthers"
              />
            }
            label="Muslim"
          />
        </Box>
        {/* Martial Status */}
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
            Martial Status
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isMarried} // Use the state directly for checked property
                onChange={(e) => setIsMarried(e.target.checked)} // Update the state directly with the checked value
                name="isMarried"
              />
            }
            label="Married"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isSingle} // Use the state directly for checked property
                onChange={(e) => setIsSingle(e.target.checked)} // Update the state directly with the checked value
                name="isSingle"
              />
            }
            label="Single"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isWidow} // Use the state directly for checked property
                onChange={(e) => setIsWidow(e.target.checked)} // Update the state directly with the checked value
                name="isWidow"
              />
            }
            label="Widowed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDivorced} // Use the state directly for checked property
                onChange={(e) => setIsDivorced(e.target.checked)} // Update the state directly with the checked value
                name="isDivorced"
              />
            }
            label="Widowed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isSeparate} // Use the state directly for checked property
                onChange={(e) => setIsSeparate(e.target.checked)} // Update the state directly with the checked value
                name="isSeparate"
              />
            }
            label="Separated"
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth // Takes the full width of the container
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isOwned} // Use the state directly for checked property
                onChange={(e) => setIsOwned(e.target.checked)} // Update the state directly with the checked value
                name="isOwned"
              />
            }
            label="Owned"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRented} // Use the state directly for checked property
                onChange={(e) => setIsRented(e.target.checked)} // Update the state directly with the checked value
                name="isRented"
              />
            }
            label="Rented"
          />
          <TextField
            type="number"
            label="Residence Customer year"
            value={residenceCustYr}
            name="residenceCustYr"
            onChange={(e) => setResidenceCustYr(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
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
            value={mobileNo1}
            onChange={(e) => setMobileNo1(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Alternate Mobile Number"
            value={mobileNo2}
            onChange={(e) => setMobileNo2(e.target.value)}
            margin="normal"
            sx={{ width: "200px", marginRight: "10px" }}
          />
        </Box>

        {/* Add more TextField or other input components for each field */}
        {/* Display completion message or complete step button */}
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

export default ClientPersonalInfo;
