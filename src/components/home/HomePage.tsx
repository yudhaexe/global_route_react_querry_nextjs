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
import { addUser, deleteUser, updateUser } from "../../../app/(api)/Users";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("testing@gmail.com");
  const [selectedEditUserId, setSelectedEditUserId] = useState<number | null>(
    null
  );
  const [users, setUsers] = useState<Users[]>([]);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setUsersCount = useCountData((state) => state.setUsersCount);

  if (users.length) {
    setUsersCount(users.length);
  }
  const onSubmitClicked = async () => {
    if (selectedEditUserId != null) {
      try {
        setLoading(true);
        const updatedUser = await updateUser(selectedEditUserId, name, email);
        const updatedUsers = users.map((user) =>
          user.id === selectedEditUserId ? updatedUser : user
        );
        setUsers(updatedUsers);
        setName("");
        setEmail("");
        setSelectedEditUserId(null);
        alert("Data Berhasil Diupdate");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      if (selectedEditUserId === null) return;
      try {
        setLoading(true);
        const newUser = await addUser(name, email);
        setUsers([...users, newUser]);
        setName("");
        alert("Data Berhasil Ditambahkan");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (user: Users) => {
    setName(user.name);
    setEmail(user.email);
    setSelectedEditUserId(user.id);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteUser(id);
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      alert("Data Berhasil Dihapus");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
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
        <Typography className="font-bold text-xl">
          {!selectedEditUserId ? "Tambah Data" : "Update Data"}
        </Typography>
        <div className="flex gap-3">
          <TextField
            required
            id="outlined-required"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={onSubmitClicked}
            className="bg-blue-500 text-white hover:bg-blue-700 w-24 normal-case"
          >
            {!selectedEditUserId ? "Submit" : "Update"}
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleEdit(row);
                    }}
                    className="normal-case outline-1 outline outline-yellow-300 text-yellow-300 hover:outline-yellow-500 hover:text-yellow-500"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                    className="normal-case outline-1 outline outline-red-300 text-red-300 hover:outline-red-500 hover:text-red-500"
                  >
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
