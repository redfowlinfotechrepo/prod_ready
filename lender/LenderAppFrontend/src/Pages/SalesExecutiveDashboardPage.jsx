import React, { useEffect, useState } from "react";
import SalesExecNavbar from "../Components/SalesExecNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  ListItem,
  List,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SalesExecutiveDashboardPage = () => {
  const salesExecId = localStorage.getItem("SalesExecId");

  const [clientDtlRows, setClientDtlRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const alternateRowColor = (index) => {
    const backgroundColor = index % 2 === 0 ? "grey.300" : "#f2f2f2"; // Black and grayish colors
    const textColor = index % 2 === 0 ? "white" : "black"; // White and black text colors
    return { backgroundColor, color: textColor };
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //for UpdateClientDialogue
  const [openClientUpdateDialogue, setOpenClientUpdateDialogue] =
    useState(false);
  const [dialogueClientName, setDialogueContentName] = useState("");
  const [dialogueClientPhone, setDialogueContentPhone] = useState("");

  //for center selection
  const [selectedCenter, setSelectedCenter] = useState({
    value: "all",
    label: "All",
  });
  const [selectedCenterId, setSelectedCenterId] = useState("all");

  const [listOfCenters, setListOfCenters] = useState([]);
  const CenterOptions = [
    { value: "all", label: "All" }, // Add this line for the "All" option
    ...listOfCenters.map((center) => ({
      value: center.id,
      label: center.centerName,
      centerCode: center.centerCode,
      IFSC: center.IFSC,
      Incharge: center.centerIncharge,
    })),
  ];

  //to fetch CenterDtls
  const fetchCenterRows = async () => {
    try {
      const response = await axios.get("/api/v1/center/getAllCenterDetails");

      setListOfCenters(response.data.centers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCenterSelect = (selectedOption) => {
    setSelectedCenter(selectedOption);
    setSelectedCenterId(selectedOption.value);
    fetchClientLoanDtls(salesExecId, selectedOption.value);
  };

  //fetched clientLoanDetails then pass to CLientDtls func to get client's name
  const fetchClientLoanDtls = async (salesExecId, selectedCenterId) => {
    try {
      let url;
      if (selectedCenterId === "all") {
        // If the selectedCenterId is "all", fetch all entries without specifying a CenterID
        url = `/api/v1/MoneyRecord/getAllcashFlow?SalesExecID=${salesExecId}`;
      } else {
        // If a specific center is selected, fetch entries with the specified CenterID
        url = `/api/v1/MoneyRecord/getAllcashFlow?SalesExecID=${salesExecId}&CenterID=${selectedCenterId}`;
      }

      const response = await axios.get(url);

      const entries = response.data.entries;
      console.log(entries);

      const clientDetailsPromises = entries.map(async (entry) => {
        const clientDetails = await fetchClientDetails(entry.CustomerID, entry);
        return {
          ...entry,
          clientName: clientDetails.clientName,
          clientPhone: clientDetails.clientPhone,
          clientAddress: clientDetails.clientAddress,
        };
      });
      const updatedEntries = await Promise.all(clientDetailsPromises);

      setClientDtlRows(updatedEntries);
      console.log("update:", updatedEntries);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientDetails = async (clientId, row) => {
    try {
      const response = await axios.get(
        `/api/v1/client/getClientPersonalDetailsById/${clientId}`
      );
      const clientName = response.data.clientPersonal.CustomerName;
      const clientPhone = response.data.clientPersonal.MobileNo1;
      const clientAddress = response.data.clientPersonal.Address;

      return { ...row, clientName, clientPhone, clientAddress };
    } catch (error) {
      console.log(error);
      return row; // Return the original row in case of an error
    }
  };

  useEffect(() => {
    fetchCenterRows();
    fetchClientLoanDtls(salesExecId, selectedCenterId); // Add this line
  }, []);

  return (
    <>
      <SalesExecNavbar />
      <Box mt={10}>
        <section>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              minHeight: "40vh",
              padding: "20px", // Adding padding to create space around the cards
            }}
          >
            <Grid container spacing={2} alignItems="stretch">
              {/* Center Selection Section  */}
              <Grid item xs={12} sm={3}>
                <Box
                  sx={{
                    height: "100px",
                    backgroundColor: "#A4BE7B",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px", // Padding for the inner Box
                    borderRadius: "10px",
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
                <Box
                  sx={{
                    marginTop: "10px",
                    height: "300px",
                    backgroundColor: "#A4BE7B",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <Card sx={{ height: "100%", width: "100%", padding: "10px" }}>
                    <Typography variant="h6">Center Details</Typography>
                    <CardContent>
                      {selectedCenter && (
                        <div>
                          <Typography variant="subheading">
                            Center Name: {selectedCenter.label}
                          </Typography>
                          <br />
                          <Typography variant="subheading">
                            Center Code: {selectedCenter.centerCode}
                          </Typography>
                          <br />
                          <Typography variant="subheading">
                            IFSC: {selectedCenter.IFSC}
                          </Typography>
                          <br />
                          <Typography variant="subheading">
                            Incharge: {selectedCenter.Incharge}
                          </Typography>
                          <br />
                          {/* Add additional details as needed */}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              {/* Clients table section  */}
              <Grid item xs={12} sm={9}>
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#5F8D4E",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column", // Stack items vertically
                    alignItems: "flex-end", // Align items to the right
                    padding: "20px", // Padding for the inner Box
                    borderRadius: "10px",
                  }}
                >
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "black", color: "white" }}
                        >
                          <TableCell style={{ color: "white" }}>Slno</TableCell>
                          <TableCell style={{ color: "white" }}>Name</TableCell>
                          <TableCell style={{ color: "white" }}>
                            PhoneNo
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            Address
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            DayOfCollection
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            PayCount
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            Update
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {clientDtlRows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <TableRow
                              key={row.slno}
                              sx={alternateRowColor(index)} // Apply styles here
                            >
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{row.clientName}</TableCell>
                              <TableCell>{row.clientPhone}</TableCell>
                              <TableCell>{row.Address}</TableCell>
                              <TableCell>{row.DayOfCollection}</TableCell>
                              <TableCell>
                                {row.CurrentPayCount}/{row.PayCount}
                              </TableCell>

                              <TableCell>
                                <Button variant="outlined">Update</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={clientDtlRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableContainer>
                  {/* Add user Button */}
                  <Box
                    sx={{
                      marginTop: "10px",
                      justifyContent: "flex-end", // Align the button to the right
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setOpenClientUpdateDialogue(true)}
                      sx={{
                        backgroundColor: "#285430",
                        "&:hover": {
                          backgroundColor: "#224B0C",
                        },
                        marginRight: "5px",
                      }}
                    >
                      Add User
                    </Button>
                    <Button
                      variant="contained"
                      // onClick={() => setAddCenterDialogue(true)}
                      sx={{
                        backgroundColor: "#285430",
                        "&:hover": {
                          backgroundColor: "#224B0C",
                        },
                      }}
                    >
                      Know More
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>
        <section mt={10}></section>

        <Box>
          <Dialog
            open={openClientUpdateDialogue}
            onClose={() => setOpenClientUpdateDialogue(false)}
          >
            <DialogTitle>Update Loan Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Update Loan details:</DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minWidth: "100px",
                  width: "500px",
                  marginTop: "5px",
                }}
              >
                <TextField
                  disabled
                  label="Client Name"
                  value={dialogueClientName}
                  fullWidth
                />
                <TextField
                  disabled
                  label="Client Phone No"
                  value={dialogueClientPhone}
                  fullWidth
                />
                <TextField
                  disabled
                  label="Amount To be paid"
                  value={dialogueClientPhone}
                  fullWidth
                />
                <TextField
                  disabled
                  label="Amount Paid"
                  value={dialogueClientPhone}
                  fullWidth
                />
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default SalesExecutiveDashboardPage;
