"use client";

import useUsers from "@/store/users";
import { Typography } from "@mui/material";
import { useEffect } from "react";

interface DataCounterProps {
  count: number;
}
export default function DataCounter(props: DataCounterProps) {
  return (
    <Typography className="font-bold">Total Data : {props.count}</Typography>
  );
}
