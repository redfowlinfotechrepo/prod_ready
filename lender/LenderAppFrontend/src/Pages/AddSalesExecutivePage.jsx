import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddSalesExecutivePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRowSalesExec, setSelectedRowSalesExec] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [selectedRowClient, setSelectedRowClient] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [fetchedRows, setFetchedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [clientRows, setClientRows] = useState([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [clientPage, setClientPage] = useState(0);
  const [clientRowsPerPage, setClientRowsPerPage] = useState(5);

  const handleChangeClientPage = (event, newPage) => {
    setClientPage(newPage);
  };

  const handleChangeClientRowsPerPage = (event) => {
    setClientRowsPerPage(+event.target.value);
    setClientPage(0);
  };

  const handleAddUser = () => {
    setOpenDialog(true);
  };

  const handleSaveUser = () => {
    // Handle saving new user data here
    console.log("New User Data:", newUserData);
    setOpenDialog(false);
    // Reset input fields after saving if needed
    setNewUserData({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  //saving sales exec
  const handleSave = async () => {
    setIsEditMode(false);

    // Create the payload with the updated data from input fields
    const payload = {
      name: selectedRowData.Name,
      email: selectedRowData.EmailAddr,
      phoneNumber: selectedRowData.Phone,
      address: selectedRowData.Address,
    };

    try {
      // Assuming you have the ID of the employee
      const employeeId = selectedRowData.id; // Replace this with the actual ID

      // Send a PATCH request to update the employee by ID
      const response = await axios.patch(
        `/api/v1/employee/updateEmployeeById/${employeeId}`,
        payload
      );

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Employee updated successfully");
        setSnackbarOpen(true);
        fetchSalesExec();
        // Handle success, reset fields or perform any additional actions
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to update employee");
        setSnackbarOpen(true);
        // Handle failure scenario
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating employee");
      setSnackbarOpen(true);
      console.error("Error updating employee:", error.message);
      // Handle error scenario
    }
  };

  // Replace with your data or initialize as needed
  const SalesExecColumns = [
    { id: "slno", label: "Slno.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "phoneNumber", label: "Phone Number", minWidth: 170 },
    { id: "amountFloated", label: "Amount", minWidth: 170, align: "center" },
  ];

  const clientColumns = [
    { id: "slno", label: "Slno.", minWidth: 100, align: "center" },
    { id: "name", label: "Name", minWidth: 150, align: "center" },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 150,
      align: "center",
    },
    { id: "dateOfLoan", label: "Date of Loan", minWidth: 150, align: "center" },
    { id: "amount", label: "Amount", minWidth: 150, align: "center" },
  ];

  const alternateRowColor = (index) => {
    return index % 2 === 0 ? "#f2f2f2" : "#dddddd"; // Grayish and blackish colors
  };

  const handleRowSelectSalesExec = (event, row) => {
    setSelectedRowSalesExec(row.Name);
    setSelectedEmployee(row.id);
    setSelectedRowData(row);
    fetchClients(row.id); // Pass the selected sales exec ID to fetchClients
  };

  const handleRowSelectClient = (event, row) => {
    setSelectedRowClient(row.phoneNumber);
    console.log("Selected Client Row:", row);
  };

  const fetchSalesExec = async () => {
    try {
      const response = await axios.get(
        "/api/v1/employee/getAllEmployees?Role=SalesExec"
      );
      if (response.status === 200) {
        const { employees } = response.data;
        setFetchedRows(employees);
        console.log(employees);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const fetchClients = async (salesExecID) => {
    try {
      const response = await axios.get(
        `/api/v1/client/getAllClientPersonalDetails?salesExecID=${salesExecID}`
      );
      if (response.status === 200) {
        const { clients } = response.data;
        setClientRows(clients); // Update the clientRows state with the fetched data
        console.log("clients:", clients);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchSalesExec();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchClients(selectedEmployee);
    }
  }, [selectedEmployee]);

  return (
    <>
      <AdminNavbar />
      {/* Header Section */}
      <section className="header">
        <Box
          sx={{
            marginTop: "63px",
            backgroundColor: "white",
            width: "100%",
            minHeight: "20px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Sales Excecutives </Typography>
        </Box>
      </section>

      {/* SalesExecDetails */}
      <section className="SalesExecDetails">
        <Box>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "600px",
              padding: "20px",
            }}
          >
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={7}>
                {/* Sales Exec Table */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#A4BE7B",
                    width: "100%",
                    display: "flex-col",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow style={{ backgroundColor: "black" }}>
                            <TableCell style={{ background: "black" }} />
                            {SalesExecColumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  background: "black",
                                  minWidth: column.minWidth,
                                  color: "white",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fetchedRows.map((row, index) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id} // Use a unique identifier for the key, assuming row.id exists
                              style={{
                                backgroundColor: alternateRowColor(index),
                              }}
                              // Handle selection for Sales Executives table
                              onClick={(event) =>
                                handleRowSelectSalesExec(event, row)
                              }
                            >
                              <TableCell>
                                <Radio
                                  value={row.Phone} // Use a unique identifier for the value
                                  checked={selectedRowSalesExec === row.Name} // Compare with the same field used for selection
                                  onChange={(event) =>
                                    handleRowSelectSalesExec(event, row)
                                  }
                                />
                              </TableCell>
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">{row.Name}</TableCell>
                              <TableCell align="center">{row.Phone}</TableCell>
                              <TableCell align="center">
                                {row.AmountLended || 0}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={fetchedRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  <Box sx={{ marginTop: "20px", textAlign: "right" }}>
                    <Button
                      variant="contained"
                      // color="primary"
                      onClick={handleAddUser}
                      sx={{
                        backgroundColor: "#285430",
                        "&:hover": {
                          backgroundColor: "#224B0C",
                        },
                      }}
                    >
                      Add user
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={5}>
                {/* Sales Exec Profile  */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#5F8D4E",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "white",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Box>
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          item
                          xs={12}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Avatar
                            alt="User Logo"
                            src="/path_to_your_user_logo.jpg"
                            sx={{ width: 100, height: 100 }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Name"
                            value={selectedRowData ? selectedRowData.Name : ""}
                            disabled={!isEditMode} // Enable/disable based on isEditMode
                            onChange={(e) =>
                              setSelectedRowData({
                                ...selectedRowData,
                                Name: e.target.value, // Update 'Name' field in the state
                              })
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Email"
                            value={
                              selectedRowData ? selectedRowData.EmailAddr : ""
                            }
                            disabled={!isEditMode} // Enable/disable based on isEditMode
                            onChange={(e) =>
                              setSelectedRowData({
                                ...selectedRowData,
                                EmailAddr: e.target.value, // Update 'EmailAddr' field in the state
                              })
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Phone Number"
                            value={selectedRowData ? selectedRowData.Phone : ""}
                            disabled={!isEditMode} // Enable/disable based on isEditMode
                            onChange={(e) =>
                              setSelectedRowData({
                                ...selectedRowData,
                                Phone: e.target.value, // Update 'Phone' field in the state
                              })
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Address"
                            value={
                              selectedRowData ? selectedRowData.Address : ""
                            }
                            disabled={!isEditMode} // Enable/disable based on isEditMode
                            onChange={(e) =>
                              setSelectedRowData({
                                ...selectedRowData,
                                Address: e.target.value, // Update 'Address' field in the state
                              })
                            }
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: "20px", textAlign: "right" }}>
                    {isEditMode ? ( // Conditionally render Save/Edit button based on edit mode
                      <Button
                        variant="contained"
                        // color="primary"
                        sx={{
                          backgroundColor: "#285430",
                          "&:hover": {
                            backgroundColor: "#224B0C",
                          },
                        }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                        sx={{
                          backgroundColor: "#285430",
                          "&:hover": {
                            backgroundColor: "#224B0C",
                          },
                        }}
                      >
                        Edit
                        <EditIcon fontSize="sm" />
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>

      {/* ClientDetails */}
      <section className="ClientDetails">
        <Box>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "680px",
              padding: "20px",
            }}
          >
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={12} md={8}>
                {/* customer Details Table */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#5F8D4E",
                    width: "100%",
                    display: "flex-col",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "20px",
                      padding: "20px",
                    }}
                  >
                    <Typography variant="h5">Customer Details </Typography>
                  </Box>
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow style={{ backgroundColor: "black" }}>
                            <TableCell style={{ background: "black" }} />
                            {clientColumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  background: "black",
                                  minWidth: column.minWidth,
                                  color: "white",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {clientRows
                            .slice(
                              clientPage * clientRowsPerPage,
                              clientPage * clientRowsPerPage + clientRowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.CutomerID} // Assuming CutomerID is a unique identifier
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#f2f2f2" : "#dddddd",
                                }}
                                // Handle selection for Client Details table
                                onClick={(event) =>
                                  handleRowSelectClient(event, row)
                                }
                              >
                                <TableCell>
                                  <Radio
                                    value={row.CutomerID} // Use a unique identifier for the value
                                    checked={
                                      selectedRowClient === row.CutomerID
                                    }
                                    onChange={(event) =>
                                      handleRowSelectClient(event, row)
                                    }
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                  {row.CustomerName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.MobileNo1}
                                </TableCell>

                                {clientColumns.map((column) => (
                                  <TableCell key={column.id} align="center">
                                    {row[column.id]}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={clientRows.length}
                      rowsPerPage={clientRowsPerPage}
                      page={clientPage}
                      onPageChange={handleChangeClientPage}
                      onRowsPerPageChange={handleChangeClientRowsPerPage}
                    />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "600px",
                    backgroundColor: "#A4BE7B",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "white",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    {/* Content for the white box */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>

      {/* Modal to add user */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter user details:</DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minWidth: "lg",
            }}
          >
            <TextField
              label="Name"
              value={newUserData.name}
              onChange={(e) =>
                setNewUserData({ ...newUserData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={newUserData.email}
              onChange={(e) =>
                setNewUserData({ ...newUserData, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={newUserData.phoneNumber}
              onChange={(e) =>
                setNewUserData({ ...newUserData, phoneNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Address"
              value={newUserData.address}
              onChange={(e) =>
                setNewUserData({ ...newUserData, address: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveUser}
            // color="primary"
            sx={{
              backgroundColor: "#285430",
              "&:hover": {
                backgroundColor: "#224B0C",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSalesExecutivePage;
