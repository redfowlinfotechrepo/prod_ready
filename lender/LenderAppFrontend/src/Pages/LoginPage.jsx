import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [access, setAccess] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/v1/employee/login", {
        phoneNumber,
        password,
      });
      const { token, role, SalesExecId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      if (role === "SalesExec") {
        localStorage.setItem("SalesExec-authorized", "true");
      } else if (role === "Admin") {
        localStorage.setItem("Admin-authorized", "true");
      }
      localStorage.setItem("SalesExecId", SalesExecId);
      setAccess(role);
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#A6CF98",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "50%", height: "100%" }}>
            <img
              src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              LENDER APP
            </Typography>

            <TextField
              label="Phone Number"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                style: { borderColor: "#739072" },
              }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                style: { borderColor: "#739072" },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                backgroundColor: "#557C55",
                "&:hover": {
                  backgroundColor: "#739072",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
        {showSuccess && (
          <Link
            to={
              access === "SalesExec"
                ? "/sales-exec/dashboard"
                : "/admin/dashboard"
            }
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                backgroundColor: "#557C55",
                "&:hover": {
                  backgroundColor: "#739072",
                },
              }}
            >
              Go to Dashboard
            </Button>
          </Link>
        )}

        {showError && (
          <Alert severity="error" sx={{ width: "100%", marginTop: "20px" }}>
            <AlertTitle>Wrong Credentials</AlertTitle>
            The provided credentials are incorrect. Please try again.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
