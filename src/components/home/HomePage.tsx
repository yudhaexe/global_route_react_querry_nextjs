"use client";

import useUsers from "@/store/users";
import { useEffect } from "react";
import DataCounter from "../DataCounter";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export default function HomePage() {
  const { users, usersCount, fetchUsers } = useUsers((state) => state);

  useEffect(() => {
    fetchUsers(); // Call without the URL
  }, [fetchUsers]);

  console.log(users);

  return (
    <div className="mt-5">
      <DataCounter count={usersCount} />
      <div className="my-5 flex flex-col gap-2">
        <Typography className="font-bold text-xl">Tambah Data</Typography>
        <div className="flex gap-3">
          <TextField required id="outlined-required" defaultValue="John" />
          <Button className="bg-blue-500 text-white hover:bg-blue-700 w-24">
            Submit
          </Button>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><Button className="bg">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
