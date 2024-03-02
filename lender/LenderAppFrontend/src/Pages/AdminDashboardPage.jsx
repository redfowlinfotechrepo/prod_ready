import React from "react";
import AdminNavbar from "../Components/AdminNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";

import SalesExeTableComponent from "../Components/SalesExeTableComponent";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      {/* Header Section */}
      <section className="header">
        <Box
          sx={{
            marginTop: "70px",
            backgroundColor: "white",
            width: "100%",
            minHeight: "20px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Hi Admin</Typography>
        </Box>
      </section>

      {/* Pie Chart Section  */}
      <section className="ChartSection">
        <Box>
          {/* Adjust the marginTop to make sure the content is below the navbar */}
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              minHeight: "40vh",
              padding: "20px", // Adding padding to create space around the cards
            }}
          >
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={12} md={6}>
                {/* clients Chart */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#A4BE7B",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px", // Padding for the inner Box
                    borderRadius: "10px",
                  }}
                >
                  <Card variant="outlined" sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Money Floating with clients:
                      </Typography>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{ textAlign: "right" }}
                      >
                        <CurrencyRupeeIcon fontSize="large" /> 250,000
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <PieChart width={200} height={200}>
                          <Pie
                            dataKey="value" // Use "dataKey" instead of "valueKey"
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40} // Define innerRadius
                            outerRadius={50}
                            fill="#596FB7"
                            label
                          />
                          <Pie
                            dataKey="value" // Use "dataKey" instead of "valueKey"
                            data={[{ value: 100 }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={40} // Define outerRadius
                            fill="transparent" // Set the inner circle to transparent
                          />
                        </PieChart>
                      </Box>
                      <Box sx={{ marginTop: "20px", textAlign: "right" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#285430",
                            "&:hover": {
                              backgroundColor: "#224B0C",
                            },
                          }}
                        >
                          Explore
                        </Button>
                      </Box>
                      {/* New content ends here */}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* investors chart  */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#5F8D4E",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px", // Padding for the inner Box
                    borderRadius: "10px",
                  }}
                >
                  <Card variant="outlined" sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Money from investors:
                      </Typography>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{ textAlign: "right" }}
                      >
                        <CurrencyRupeeIcon fontSize="large" /> 250,000
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <PieChart width={200} height={200}>
                          <Pie
                            dataKey="value" // Use "dataKey" instead of "valueKey"
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40} // Define innerRadius
                            outerRadius={50}
                            fill="#176B87"
                            label
                          />
                          <Pie
                            dataKey="value" // Use "dataKey" instead of "valueKey"
                            data={[{ value: 100 }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={40} // Define outerRadius
                            fill="transparent" // Set the inner circle to transparent
                          />
                        </PieChart>
                      </Box>
                      <Box sx={{ marginTop: "20px", textAlign: "right" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#285430",
                            "&:hover": {
                              backgroundColor: "#224B0C",
                            },
                          }}
                        >
                          Explore
                        </Button>
                      </Box>
                      {/* New content ends here */}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>

      {/* Tables Section  */}
      <section>
        <Box sx={{ backgroundColor: "white", p: 2 }}>
          <Grid container spacing={2}>
            {/* Sales Executives List  */}

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  backgroundColor: "#5F8D4E",
                  height: "200px",
                  padding: "20px",
                  height: "550px",
                  borderRadius: "10px",
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold" mb={"5px"}>
                    Sales Executives
                  </Typography>
                </Box>
                <Box>
                  <SalesExeTableComponent />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px", // Adjust spacing as needed
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mr: "5px",
                      backgroundColor: "#285430",
                      "&:hover": {
                        backgroundColor: "#224B0C",
                      },
                    }}
                  >
                    Add More Sales Exec
                  </Button>
                  <Link
                    to="/admin/addsalesexec"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#285430",
                        "&:hover": {
                          backgroundColor: "#224B0C",
                        },
                      }}
                    >
                      See More
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            {/* Transaction Logs  */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  backgroundColor: "#A4BE7B",
                  height: "200px",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    height: "100%",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "grey.300",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <Typography variant="subheading">From:</Typography>

                        <Typography variant="subheading">To:</Typography>
                      </Box>
                      <br />
                      <Typography variant="subheading">Amount:</Typography>
                      <br />
                      <Typography variant="subheading">Date:</Typography>
                      <br />
                      {/* Add additional details as needed */}
                    </div>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>
    </>
  );
};

export default AdminDashboard;
