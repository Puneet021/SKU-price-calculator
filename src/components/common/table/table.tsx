import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./table.module.scss";
import { NoDataDiv } from "./table.constants";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DataTable() {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableRow}>
            <TableCell className={styles.tableCell} align="center">
              Dessert (100g serving)
            </TableCell>
            <TableCell className={styles.tableCell} align="center">
              Calories
            </TableCell>
            <TableCell className={styles.tableCell} align="center">
              Fat&nbsp;(g)
            </TableCell>
            <TableCell className={styles.tableCell} align="center">
              Carbs&nbsp;(g)
            </TableCell>
            <TableCell
              className={styles.tableCell}
              align="center"
              style={{ borderRight: 0 }}
            >
              Protein&nbsp;(g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {rows?.map((row) => (
            <TableRow
              className={styles.tableRow}
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: 0 },
                "&:hover": {
                  backgroundColor: "#333231",
                  transition: "all 0.3s",
                },
              }}
            >
              <TableCell
                className={styles.tableCell}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell className={styles.tableCell} align="right">
                {row.calories}
              </TableCell>
              <TableCell className={styles.tableCell} align="right">
                {row.fat}
              </TableCell>
              <TableCell className={styles.tableCell} align="right">
                {row.carbs}
              </TableCell>
              <TableCell
                className={styles.tableCell}
                align="right"
                style={{ borderRight: 0 }}
              >
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 ? (
        <NoDataDiv>
          <ErrorOutlineIcon style={{ marginTop: "0.1em" }} />
          &nbsp;<p>No Data Found</p>
        </NoDataDiv>
      ) : null}
    </TableContainer>
  );
}
