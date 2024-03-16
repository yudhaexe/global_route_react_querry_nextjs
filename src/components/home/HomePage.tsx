"use client";

import { useEffect, useState } from "react";

import useCountData from "@/store/CountData";
import { Users } from "@/types";
import useLoadingStore from "@/store/Loading";
import DataCounter from "../DataCounter";
import getUsers from "../../../app/(api)/getUser";

export default function HomePage() {
  const [users, setUsers] = useState<Users[]>([]);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (users !== null) {
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
    }
  }, [setLoading]);

  return (
    <div className="mt-5">
      <DataCounter />
    </div>
  );
}
