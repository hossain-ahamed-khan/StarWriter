"use client";

import { useEffect, useState } from "react";
import { TableBody } from "@/components/ui/table";
import UserTableRow, { UserRowData } from "./UserTableRow";
import { getAllUser } from "@/services/GetAllUser";

type UsersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserRowData[];
};

export default function UserTableBody() {
  const [users, setUsers] = useState<UserRowData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const data = (await getAllUser()) as UsersResponse | undefined;
        if (!cancelled) {
          if (data && Array.isArray(data.results)) {
            setUsers(data.results);
          } else {
            setUsers([]);
          }
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <TableBody>
        <tr>
          <td className="py-6 text-center" colSpan={7}>
            Loading users...
          </td>
        </tr>
      </TableBody>
    );
  }

  if (error) {
    return (
      <TableBody>
        <tr>
          <td className="py-6 text-center text-red-600" colSpan={7}>
            {error}
          </td>
        </tr>
      </TableBody>
    );
  }

  if (!users || users.length === 0) {
    return (
      <TableBody>
        <tr>
          <td className="py-6 text-center" colSpan={7}>
            No users found
          </td>
        </tr>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {users.map((user) => (
        <UserTableRow
        key={user.user_id}
        index = {users.indexOf(user) + 1}
        user = {user}
        onDeleted={(user_id) => {
          setUsers((prev) => prev?.filter((user) => user.user_id !== user_id) || null);
        }}
        />
      ))}
    </TableBody>
  );
}
