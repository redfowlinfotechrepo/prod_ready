import React, { useState } from "react";
import SalesExecNavbar from "../Components/SalesExecNavbar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import ClientPersonalInfo from "../AddClientSections/ClientPersonalInfo";
import ClientFamilyDetails from "../AddClientSections/ClientFamilyDetails";
import ClientGuarantorDetails from "../AddClientSections/ClientGuarantorDetails";
import ClientBankDtls from "../AddClientSections/ClientBankDtls";
import ClinetOtherExpDtls from "../AddClientSections/ClinetOtherExpDtls";
import ClientVerificationDtls from "../AddClientSections/ClientVerificationDtls";

const steps = [
  "Client Personal Information",
  "Client Family Details",
  "Client Bank Details",
  "Client Household Expenses Details",
  "Client Guarantor Details",
  "Identity Details",
];

const AddCustomerPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [members, setMembers] = useState([
    {
      MemberName: "",
      Relation: "",
      Age: "",
      Occupation: "",
      Education: "",
      Income: "",
    },
  ]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box
      sx={{
        backgroundColor: "#86A789",
        height: "100%",
        marginTop: "65px",
        padding: "20px",
      }}
    >
      <SalesExecNavbar />
      <Box
        height="20%"
        bgcolor="white"
        p={"20px"}
        sx={{ borderRadius: "10px" }}
      >
        {/* Stepper */}
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <Box
        height="80%"
        bgcolor="white"
        sx={{ display: "flex-col", marginTop: "10px", borderRadius: "10px" }}
      >
        <Box>
          {activeStep === 0 && <ClientPersonalInfo />}
          {activeStep === 1 && <ClientFamilyDetails />}
          {activeStep === 2 && <ClientBankDtls />}
          {activeStep === 3 && <ClinetOtherExpDtls />}
          {activeStep === 4 && <ClientGuarantorDetails />}
          {activeStep === 5 && <ClientVerificationDtls />}
        </Box>

        {/* stepper next level */}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
          {activeStep !== steps.length &&
            (completed[activeStep] ? (
              <Typography variant="caption" sx={{ display: "inline-block" }}>
                {/* Step {activeStep + 1} already completed */}
              </Typography>
            ) : (
              <Button onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddCustomerPage;
