import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import Select from "react-select";
import {
  Box,
  Grid,
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
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";

const inverstorPieChartData = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];
const clientPieChartData = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
  { id: 3, value: 20, label: "series C" },
  { id: 4, value: 20, label: "series C" },
];

const CenterReportPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedSalesExecRow, setSelectedSalesExecRow] = useState(null);

  const [salesExecDtlRows, setSalesExecDtlRows] = useState([]);
  const [clientDtlRows, setClientDtlRows] = useState([]);

  //to save salesExecDtls to create new emp
  const [salesExecName, setSalesExecName] = useState("");
  const [salesExecContact, setSalesExecContact] = useState("");
  const [salesExecEmail, setSalesExecEmail] = useState("");
  const [salesExecAdd, setSalesExecAdd] = useState("");
  const [salesExecCenter, setSalesExecCenter] = useState("");

  //to create new center
  const [centerName, setCenterName] = useState("");
  const [centerCode, setCenterCode] = useState("");
  const [centerIncharge, setCenterIncharge] = useState("");

  //for center selection
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [listOfCenters, setListOfCenters] = useState([]);
  const CenterOptions = listOfCenters.map((center) => ({
    value: center.id,
    label: center.centerName, // Adjust this based on your data structure
  }));
  const handleCenterSelect = (selectedOption) => {
    console.log(selectedOption);
    setCenterCode(selectedOption.value);
    setSelectedCenter(selectedOption);
    setSalesExecCenter(selectedOption.value);
  };

  //to handle center radio change
  const handleCenterRadioChange = (event, value, row) => {
    setSelectedValue(value);
    setSelectedSalesExecRow(row);
    fetchSalesExecOnCenterSelect(row.id);

    console.log(row.id);
  };

  //handle sales exec radio change
  const handleSalesExecRadioChange = (event, value, row) => {
    setSelectedValue(value);
    setSelectedSalesExecRow(row);
    fetchClientLoanDtls(row.id);
  };

  const [addCenterDialogue, setAddCenterDialogue] = useState(false);
  const [addSalesExecDialogue, setAddSalesExecDialogue] = useState(false);
  const [knowClientDtlsDialogue, setKnowClientDtlsDialogue] = useState(false);

  const [centerDtlRows, setCenterDtlRows] = useState([]);

  const handleKnowClientDtlsDialogueClose = () => {
    setKnowClientDtlsDialogue(false);
  };

  // transition for know client details modal
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // Clear the selection when changing the page
  useEffect(() => {
    setSelectedValue(null);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const alternateRowColor = (index) => {
    const backgroundColor = index % 2 === 0 ? "grey.300" : "#f2f2f2"; // Black and grayish colors
    const textColor = index % 2 === 0 ? "white" : "black"; // White and black text colors
    return { backgroundColor, color: textColor };
  };

  //fetched clientLoanDetails then pass to CLientDtls func to get client's name
  const fetchClientLoanDtls = async (salesExecId) => {
    try {
      const response = await axios.get(
        `/api/v1/MoneyRecord/getAllcashFlow?SalesExecID=${salesExecId}`
      );

      const entries = response.data.entries;

      const clientDetailsPromises = entries.map(async (entry) => {
        const clientDetails = await fetchClientDetails(entry.CustomerID, entry);
        return { ...entry, clientName: clientDetails.clientName };
      });
      const updatedEntries = await Promise.all(clientDetailsPromises);
      setClientDtlRows(updatedEntries);
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
      return { ...row, clientName };
    } catch (error) {
      console.log(error);
      return row; // Return the original row in case of an error
    }
  };

  //to fetch CenterDtls
  const fetchCenterRows = async () => {
    const response = await axios.get("/api/v1/center/getAllCenterDetails");

    setCenterDtlRows(response.data.centers);
    setListOfCenters(response.data.centers);
  };

  const fetchSalesExecOnCenterSelect = async (centerId) => {
    try {
      const response = await axios.get(
        `/api/v1/employee/getAllEmployees?centerId=${centerId}`
      );
      console.log(response.data.employees);
      setSalesExecDtlRows(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  //to create center
  const handleSaveCenterDtls = async () => {
    const centerDtls = {
      centerCode: centerCode,
      centerName: centerName,
      centerIncharge: centerIncharge,
    };

    try {
      const response = await axios.post(
        "/api/v1/center/createCenterDetails",
        centerDtls
      );

      if (response.status === 201) {
        console.log("Center Created");
        setAddCenterDialogue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to create salesExec
  const handleSaveSalesExec = async () => {
    const SalesExecDtls = {
      name: salesExecName,
      phoneNumber: salesExecContact,
      email: salesExecEmail,
      address: salesExecAdd,
      Role: "SalesExec",
      password: salesExecContact,
      centerId: salesExecCenter,
    };
    console.log(SalesExecDtls);
    try {
      const response = await axios.post(
        "/api/v1/employee/register",
        SalesExecDtls
      );
      if (response.status === 201) {
        console.log("Sales Executive added");
        setAddSalesExecDialogue(false);
      } else {
        console.log("not done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCenterRows();
  }, []);
  return (
    <>
      <AdminNavbar />
      {/* Center Details */}
      <Box sx={{ marginTop: "70px" }}>
        <section className="CenterDetails">
          <Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                padding: "20px",
              }}
            >
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} md={8}>
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
                        padding: "10px",
                      }}
                    >
                      <Typography variant="h4">Center Details</Typography>
                    </Box>

                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow
                            sx={{ backgroundColor: "black", color: "white" }}
                          >
                            <TableCell style={{ color: "white" }}>
                              Slno
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Center Code
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              CenterName
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              IFSCcode
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Amount
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Select
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {centerDtlRows
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
                                <TableCell>{row.centerCode}</TableCell>
                                <TableCell>{row.centerName}</TableCell>
                                <TableCell>{row.IFSC}</TableCell>
                                <TableCell>{row.TotalAmount}</TableCell>
                                <TableCell>
                                  <RadioGroup
                                    value={selectedValue} // Add state to manage the selected radio button
                                    onChange={(event) =>
                                      handleCenterRadioChange(
                                        event,
                                        row.centerCode,
                                        row
                                      )
                                    }
                                  >
                                    <FormControlLabel
                                      value={row.centerCode}
                                      control={<Radio />}
                                      label=""
                                    />
                                  </RadioGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={centerDtlRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                    <Box sx={{ marginTop: "10px", textAlign: "right" }}>
                      <Button
                        variant="contained"
                        onClick={() => setAddCenterDialogue(true)}
                        sx={{
                          backgroundColor: "#285430",
                          "&:hover": {
                            backgroundColor: "#224B0C",
                          },
                        }}
                      >
                        Add Center
                      </Button>
                    </Box>
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
                      <Typography variant="h5">Investor's data</Typography>
                      <PieChart
                        series={[
                          {
                            data: inverstorPieChartData,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 20,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        height={150}
                      />
                      <Typography variant="h5">
                        Sales Executive's data
                      </Typography>

                      <PieChart
                        series={[
                          {
                            data: clientPieChartData,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 20,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        height={150}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </section>
      </Box>

      {/* Sales Executives & CLient Details */}
      <Box>
        <section>
          <Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                padding: "20px",
              }}
            >
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} md={5}>
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
                        padding: "10px",
                      }}
                    >
                      <Typography variant="h4">
                        Sales Executives Details
                      </Typography>
                    </Box>

                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow
                            sx={{ backgroundColor: "black", color: "white" }}
                          >
                            <TableCell style={{ color: "white" }}>
                              Select
                            </TableCell>

                            <TableCell style={{ color: "white" }}>
                              Name
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Contact
                            </TableCell>

                            <TableCell style={{ color: "white" }}>
                              Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {salesExecDtlRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                key={row.id} // Use salesExecId as the key
                                sx={alternateRowColor(index)} // Apply styles here
                              >
                                <TableCell>
                                  <RadioGroup
                                    value={selectedValue}
                                    onChange={(event) =>
                                      handleSalesExecRadioChange(
                                        event,
                                        row.id,
                                        row
                                      )
                                    }
                                    name="salesExecRadioGroup" // Add a common name for all radio buttons
                                  >
                                    <FormControlLabel
                                      value={row.id}
                                      control={<Radio />}
                                      label=""
                                    />
                                  </RadioGroup>
                                </TableCell>
                                <TableCell>{row.Name}</TableCell>
                                <TableCell>{row.Phone}</TableCell>
                                <TableCell>{row.AmountLended}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={centerDtlRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                    <Box sx={{ marginTop: "10px", textAlign: "right" }}>
                      <Button
                        variant="contained"
                        onClick={() => setAddSalesExecDialogue(true)}
                        sx={{
                          backgroundColor: "#285430",
                          "&:hover": {
                            backgroundColor: "#224B0C",
                          },
                        }}
                      >
                        Add Sales Executive
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box
                    sx={{
                      height: "100%",
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
                        width: "100%",
                        minHeight: "20px",
                        padding: "10px",
                      }}
                    >
                      <Typography variant="h5">Client Details</Typography>
                    </Box>

                    <TableContainer component={Paper}>
                      <Table placeholder={"Select"}>
                        <TableHead>
                          <TableRow
                            sx={{ backgroundColor: "black", color: "white" }}
                          >
                            <TableCell style={{ color: "white" }}>
                              Slno
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Name
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Loan Date
                            </TableCell>

                            <TableCell style={{ color: "white" }}>
                              Payable Amount
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              Status
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
                                key={row.CustomerID}
                                sx={alternateRowColor(index)} // Apply styles here
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.clientName}</TableCell>
                                <TableCell>
                                  {row.dateOfLoan.slice(0, 10)}
                                </TableCell>
                                <TableCell>{row.LoanAmount}</TableCell>
                                <TableCell>{row.Status}</TableCell>
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
                    <Box sx={{ marginTop: "10px", textAlign: "right" }}>
                      <Button
                        variant="contained"
                        onClick={() => setKnowClientDtlsDialogue(true)}
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
          </Box>
        </section>
      </Box>

      {/* Modal to add Center */}
      <Dialog
        open={addCenterDialogue}
        onClose={() => setAddCenterDialogue(false)}
      >
        <DialogTitle>Add Center</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter Center details:</DialogContentText>
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
              label="Center Name*"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Center Code* [eg. ABC123]"
              value={centerCode}
              onChange={(e) => setCenterCode(e.target.value)}
              fullWidth
            />
            <TextField
              label="Center Incharge"
              value={centerIncharge}
              onChange={(e) => setCenterIncharge(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#285430" }}
            onClick={() => setAddCenterDialogue(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCenterDtls}
            // color="white"
            sx={{
              color: "white",
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

      {/* Modal to add sales Executive  */}
      <Dialog
        open={addSalesExecDialogue}
        onClose={() => setAddSalesExecDialogue(false)}
      >
        <DialogTitle>Add Sales Executive</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter Sales Executive details:
          </DialogContentText>
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
              label="Sales Executive Name*"
              value={salesExecName}
              onChange={(e) => setSalesExecName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Contact No."
              value={salesExecContact}
              onChange={(e) => setSalesExecContact(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email Address"
              value={salesExecEmail}
              onChange={(e) => setSalesExecEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Address"
              value={salesExecAdd}
              onChange={(e) => setSalesExecAdd(e.target.value)}
              fullWidth
            />
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#285430" }}
            onClick={() => setAddSalesExecDialogue(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSalesExec}
            // color="white"
            sx={{
              color: "white",
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

      {/* Full Screen Modal for Client details */}
      <Dialog
        fullScreen
        open={knowClientDtlsDialogue}
        onClose={handleKnowClientDtlsDialogueClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#5F8D4E" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleKnowClientDtlsDialogueClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Client Details
            </Typography>
          </Toolbar>
        </AppBar>

        <Box p={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "black", color: "white" }}>
                  <TableCell style={{ color: "white" }}>Slno</TableCell>
                  <TableCell style={{ color: "white" }}>Name</TableCell>
                  <TableCell style={{ color: "white" }}>Loan Date</TableCell>

                  <TableCell style={{ color: "white" }}>
                    Collection Day
                  </TableCell>

                  <TableCell style={{ color: "white" }}>
                    Principal Amount
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Interest</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Payable Amount
                  </TableCell>
                  <TableCell style={{ color: "white" }}>PayCount</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {clientDtlRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row.CustomerID}
                      sx={alternateRowColor(index)} // Apply styles here
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.CustomerName}</TableCell>
                      <TableCell>{row.dateOfLoan}</TableCell>
                      <TableCell>{row.DayOfCollection}</TableCell>
                      <TableCell>{row.PrincipalAmount}</TableCell>
                      <TableCell>{row.Interest}</TableCell>
                      <TableCell>{row.PrincipalAmount}</TableCell>
                      <TableCell>{row.PayCount}</TableCell>
                      <TableCell>{row.Status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
    </>
  );
};

export default CenterReportPage;
