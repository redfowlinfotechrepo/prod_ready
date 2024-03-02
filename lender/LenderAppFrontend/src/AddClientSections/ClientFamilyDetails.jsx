import React, { useState, useEffect } from "react";
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

const ClientFamilyDetails = () => {
  const [member1, setMember1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [age1, setAge1] = useState(0);
  const [occupation1, setOccupation1] = useState("");
  const [education1, setEducation1] = useState("");
  const [income1, setIncome1] = useState(0);

  const [member2, setMember2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [age2, setAge2] = useState(0);
  const [occupation2, setOccupation2] = useState("");
  const [education2, setEducation2] = useState("");
  const [income2, setIncome2] = useState(0);

  const [member3, setMember3] = useState("");
  const [relation3, setRelation3] = useState("");
  const [age3, setAge3] = useState(0);
  const [occupation3, setOccupation3] = useState("");
  const [education3, setEducation3] = useState("");
  const [income3, setIncome3] = useState(0);

  const [member4, setMember4] = useState("");
  const [relation4, setRelation4] = useState("");
  const [age4, setAge4] = useState(0);
  const [occupation4, setOccupation4] = useState("");
  const [education4, setEducation4] = useState("");
  const [income4, setIncome4] = useState(0);

  const [member5, setMember5] = useState("");
  const [relation5, setRelation5] = useState("");
  const [age5, setAge5] = useState(0);
  const [occupation5, setOccupation5] = useState("");
  const [education5, setEducation5] = useState("");
  const [income5, setIncome5] = useState(0);

  //for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const familyId = localStorage.getItem("familyId");
  const customerId = localStorage.getItem("CustomerId");
  const flag = localStorage.getItem("flag");
  const [isSaved, setIsSaved] = useState(false);
  const [isExists, setIsExists] = useState(false);

  //To initalise Bank Details
  const initialiseBankDtls = async (customerId) => {
    try {
      const bankDetails = {
        clientID: customerId,
      };
      const response = await axios.post(
        "/api/v1/client/bankdetails/createClientBankDetails",
        bankDetails
      );
      localStorage.setItem("BankDtlsId", response.data.id);
      setSuccessMessage("Bank Details Initialized");
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessage(
        "Bank Details not initialized. Please contact the developer"
      );
      setShowAlert(true);
    }
  };

  const handleSaveData = async () => {
    // Create an object to hold all the data
    const clientFamilyData = {
      clientId: customerId,
      member1: member1,
      relation1: relation1,
      age1: age1,
      occupation1: occupation1,
      education1: education1,
      income1: income1,
      member2: member1,
      relation2: relation1,
      age2: age1,
      occupation2: occupation1,
      education2: education1,
      income2: income1,
      member3: member1,
      relation3: relation1,
      age3: age1,
      occupation3: occupation1,
      education3: education1,
      income3: income1,
      member4: member1,
      relation4: relation1,
      age4: age1,
      occupation4: occupation1,
      education4: education1,
      income4: income1,
      member5: member1,
      relation5: relation1,
      age5: age1,
      occupation5: occupation1,
      education5: education1,
      income5: income1,
    };
    console.log(clientFamilyData);
    try {
      const response = await axios.patch(
        `/api/v1/client/family/updateFamilyMemberById/${familyId}`,
        clientFamilyData
      );
      console.log(response.data);
      localStorage.setItem("flag", 2);
      setIsSaved(true);
      await initialiseBankDtls(customerId);
      setSuccessMessage(
        "Client Family Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleUpdateData = async () => {
    const clientFamilyData = {
      clientId: customerId,
      member1: member1,
      relation1: relation1,
      age1: age1,
      occupation1: occupation1,
      education1: education1,
      income1: income1,
      member2: member1,
      relation2: relation1,
      age2: age1,
      occupation2: occupation1,
      education2: education1,
      income2: income1,
      member3: member1,
      relation3: relation1,
      age3: age1,
      occupation3: occupation1,
      education3: education1,
      income3: income1,
      member4: member1,
      relation4: relation1,
      age4: age1,
      occupation4: occupation1,
      education4: education1,
      income4: income1,
      member5: member1,
      relation5: relation1,
      age5: age1,
      occupation5: occupation1,
      education5: education1,
      income5: income1,
    };
    console.log(clientFamilyData);
    try {
      const response = await axios.patch(
        `/api/v1/client/family/updateFamilyMemberById/${familyId}`,
        clientFamilyData
      );
      console.log(response.data);

      setSuccessMessage(
        "Client Family Details Updated Successfully. Proceed Further."
      );
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const setFormData = async (familyId) => {
    try {
      const response = await axios.get(
        `api/v1/client/family/getFamilyMemberById/${familyId}`
      );
      const dataExists = response.data.result;

      setMember1(dataExists.member1 || "");
      setRelation1(dataExists.relation1 || "");
      setAge1(dataExists.age1 || 0);
      setOccupation1(dataExists.occupation1 || "");
      setEducation1(dataExists.education1 || "");
      setIncome1(dataExists.income1 || 0);

      setMember2(dataExists.member2 || "");
      setRelation2(dataExists.relation2 || "");
      setAge2(dataExists.age2 || 0);
      setOccupation2(dataExists.occupation2 || "");
      setEducation2(dataExists.education2 || "");
      setIncome2(dataExists.income2 || 0);

      setMember3(dataExists.member3 || "");
      setRelation3(dataExists.relation3 || "");
      setAge3(dataExists.age3 || 0);
      setOccupation3(dataExists.occupation3 || "");
      setEducation3(dataExists.education3 || "");
      setIncome3(dataExists.income3 || 0);

      setMember4(dataExists.member4 || "");
      setRelation4(dataExists.relation4 || "");
      setAge4(dataExists.age4 || 0);
      setOccupation4(dataExists.occupation4 || "");
      setEducation4(dataExists.education4 || "");
      setIncome4(dataExists.income4 || 0);

      setMember5(dataExists.member5 || "");
      setRelation5(dataExists.relation5 || "");
      setAge5(dataExists.age5 || 0);
      setOccupation5(dataExists.occupation5 || "");
      setEducation5(dataExists.education5 || "");
      setIncome5(dataExists.income5 || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const familyId = localStorage.getItem("familyId");
    if (familyId && flag >= 2) {
      setIsExists(true);
      setIsSaved(true);
      setFormData(familyId);
    }
  }, []);

  return (
    <>
      <Box p={5} id="client-personal-info">
        {/* Member 1 */}
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
            Family Member 1
          </Typography>

          <TextField
            label=" Name"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Relation with Client"
            value={relation1}
            onChange={(e) => setRelation1(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Age"
            value={age1}
            onChange={(e) => setAge1(e.target.value)}
            margin="normal"
            sx={{ width: "100px", marginRight: "10px" }}
          />
          <TextField
            label="Occuption"
            value={occupation1}
            onChange={(e) => setOccupation1(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Education"
            value={education1}
            onChange={(e) => setEducation1(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Income"
            value={income1}
            onChange={(e) => setIncome1(e.target.value)}
            margin="normal"
            sx={{ width: "150px", marginRight: "10px" }}
          />
        </Box>
        <br />
        {/* Member 2 */}
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
            Family Member 2
          </Typography>

          <TextField
            label=" Name"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Relation with Client"
            value={relation2}
            onChange={(e) => setRelation2(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Age"
            value={age2}
            onChange={(e) => setAge2(e.target.value)}
            margin="normal"
            sx={{ width: "100px", marginRight: "10px" }}
          />
          <TextField
            label="Occuption"
            value={occupation2}
            onChange={(e) => setOccupation2(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Education"
            value={education2}
            onChange={(e) => setEducation2(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Income"
            value={income2}
            onChange={(e) => setIncome2(e.target.value)}
            margin="normal"
            sx={{ width: "150px", marginRight: "10px" }}
          />
        </Box>
        <br />
        {/* Member 3 */}
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
            Family Member 3
          </Typography>

          <TextField
            label=" Name"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Relation with Client"
            value={relation3}
            onChange={(e) => setRelation3(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Age"
            value={age3}
            onChange={(e) => setAge3(e.target.value)}
            margin="normal"
            sx={{ width: "100px", marginRight: "10px" }}
          />
          <TextField
            label="Occuption"
            value={occupation3}
            onChange={(e) => setOccupation3(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Education"
            value={education3}
            onChange={(e) => setEducation3(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Income"
            value={income3}
            onChange={(e) => setIncome3(e.target.value)}
            margin="normal"
            sx={{ width: "150px", marginRight: "10px" }}
          />
        </Box>
        <br />

        {/* Member 4 */}
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
            Family Member 4
          </Typography>

          <TextField
            label=" Name"
            value={member4}
            onChange={(e) => setMember4(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Relation with Client"
            value={relation4}
            onChange={(e) => setRelation4(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Age"
            value={age4}
            onChange={(e) => setAge4(e.target.value)}
            margin="normal"
            sx={{ width: "100px", marginRight: "10px" }}
          />
          <TextField
            label="Occuption"
            value={occupation4}
            onChange={(e) => setOccupation4(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Education"
            value={education4}
            onChange={(e) => setEducation4(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Income"
            value={income4}
            onChange={(e) => setIncome4(e.target.value)}
            margin="normal"
            sx={{ width: "150px", marginRight: "10px" }}
          />
        </Box>
        <br />

        {/* Member 5 */}
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
            Family Member 5
          </Typography>

          <TextField
            label=" Name"
            value={member5}
            onChange={(e) => setMember5(e.target.value)}
            margin="normal"
            sx={{ width: "350px", marginRight: "10px" }}
          />
          <TextField
            label="Relation with Client"
            value={relation5}
            onChange={(e) => setRelation5(e.target.value)}
            margin="normal"
            sx={{ width: "350px" }}
          />
          <br />
          <TextField
            label="Age"
            value={age5}
            onChange={(e) => setAge5(e.target.value)}
            margin="normal"
            sx={{ width: "100px", marginRight: "10px" }}
          />
          <TextField
            label="Occuption"
            value={occupation5}
            onChange={(e) => setOccupation5(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            label="Education"
            value={education5}
            onChange={(e) => setEducation5(e.target.value)}
            margin="normal"
            sx={{ width: "250px", marginRight: "10px" }}
          />
          <TextField
            type="number"
            label="Income"
            value={income5}
            onChange={(e) => setIncome5(e.target.value)}
            margin="normal"
            sx={{ width: "150px", marginRight: "10px" }}
          />
        </Box>
        <br />
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

export default ClientFamilyDetails;
