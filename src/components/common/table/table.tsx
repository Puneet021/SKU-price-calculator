import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./table.module.scss";
import { columns } from "./table.constants";

export default function DataTable(props: { rows: any }) {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableRow}>
            {columns.map((col, ind) => (
              <TableCell
                key={col.id}
                className={styles.tableCell}
                align="center"
                style={{ borderRight: columns.length === ind + 1 ? 0 : "" }}
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {props?.rows?.map((row: any) => (
            <TableRow
              className={styles.tableRow}
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: 0 },
                "&:hover": {
                  backgroundColor: "#333231",
                  transition: "all 0.3s",
                },
              }}
            >
              {Object.entries(row)
                ?.filter((i) => i[0] !== "id")
                .map((rowItem: any) => {
                  return (
                    <TableCell
                      key={`${row.id}_${rowItem[0]}`}
                      className={styles.tableCell}
                      component="th"
                      scope="row"
                      align={typeof rowItem[1] === "number" ? "right" : "left"}
                      style={{
                        borderRight: rowItem[0] === "totalFees" ? 0 : "",
                      }}
                    >
                      {rowItem[1]}
                    </TableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
