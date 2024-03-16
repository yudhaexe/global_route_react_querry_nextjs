"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useCountData from "@/store/CountData";
import { Users } from "@/types";
import useLoadingStore from "@/store/Loading";
import DataCounter from "../DataCounter";
import getUsers from "../../../app/(api)/getUser";

export default function HomePage() {
  // const { fetchUsers } = useCountData((state) => state);
  const [users, setUsers] = useState<Users[]>([]);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setUsersCount = useCountData((state) => state.setUsersCount);

  if (users.length) {
    setUsersCount(users.length);
  }
  // Directly setting state without user interaction or lifecycle methods can lead to issues.
  // This is for demonstration purposes.

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-5">
      <DataCounter />
      <div className="my-5 flex flex-col gap-2">
        <Typography className="font-bold text-xl">Tambah Data</Typography>
        <div className="flex gap-3">
          <TextField required id="outlined-required" defaultValue="John" />
          {/* <Button onClick={} className="bg-blue-500 text-white hover:bg-blue-700 w-24 normal-case">
            Submit
          </Button> */}
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button className="normal-case outline-1 outline outline-yellow-300 text-yellow-300 hover:outline-yellow-500 hover:text-yellow-500">
                    Edit
                  </Button>
                  <Button className="normal-case outline-1 outline outline-red-300 text-red-300 hover:outline-red-500 hover:text-red-500">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
