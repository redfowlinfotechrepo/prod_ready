import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

const columns = [
  { id: "slno", label: "Slno.", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  {
    id: "amountFloated",
    label: "Amount Floated",
    minWidth: 100,
    align: "center",
  },
];

export default function SalesExeTableComponent() {
  const [fetchedRows, setFetchedRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const alternateRowColor = (index) => {
    return index % 2 === 0 ? "#f2f2f2" : "#dddddd"; // Grayish and blackish colors
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/v1/employee/getAllEmployees?Role=SalesExec"
        );
        if (response.status === 200) {
          const { employees, count } = response.data; // Destructure employees and count from response.data
          setFetchedRows(employees); // Set the employees array into the fetchedRows state
          console.log(employees); // Log the employees array
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    background: "black",
                    minWidth: column.minWidth,
                    color: "white", // Text color
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id} // Use a unique identifier for the key
                  style={{ backgroundColor: alternateRowColor(index) }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "slno" ? (
                        <>{index + 1}</>
                      ) : column.id === "name" ? (
                        <>{row.Name}</>
                      ) : column.id === "amountFloated" ? (
                        <>{row.AmountLended !== null ? row.AmountLended : 0}</> // Show 0 if AmountLended is null
                      ) : (
                        <>
                          {column.format && typeof row[column.id] === "number"
                            ? column.format(row[column.id])
                            : row[column.id]}
                        </>
                      )}
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
        count={fetchedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
