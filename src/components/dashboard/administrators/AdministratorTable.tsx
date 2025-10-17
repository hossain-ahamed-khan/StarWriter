"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdministratorTableRow from "./AdministratorTableRow";
import { getAdministrators } from "@/services/Administrator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Admin = {
  full_name: string;
  email: string;
  phone?: string | null;
  role?: string | null;
  profile?: string | null;
  user_id: number;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Admin[];
  status: string;
  message: string;
};

export default function AdministratorTable() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // Listen for admin creation events to refresh the table
    const handler = () => {
      // Trigger a refresh without changing the current page number
      setReloadTick((t) => t + 1);
    };
    window.addEventListener('admin-created', handler as EventListener);
    // Also listen for admin deletions
    window.addEventListener('admin-deleted', handler as EventListener);

    return () => {
      isMounted = false;
      window.removeEventListener('admin-created', handler as EventListener);
      window.removeEventListener('admin-deleted', handler as EventListener);
    };
  }, []);

  // Fetch data when page or reloadTick changes
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      try {
        setLoading(true);
        const res = await getAdministrators({ page, pageSize });
        if (!isMounted) return;
        if (!res || !("results" in res)) {
          throw new Error("Unexpected response format");
        }
        setData(res as ApiResponse);
        setError(null);
      } catch (e: any) {
        setError(e?.message || "Failed to load administrators");
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [page, reloadTick]);

  const totalPages = useMemo(() => {
    if (!data?.count) return 1;
    return Math.max(1, Math.ceil(data.count / pageSize));
  }, [data?.count]);

  if (loading) {
    return <div className="py-8">Loading administrators...</div>;
  }

  if (error) {
    return (
      <div className="py-8 text-red-600">
        Failed to load administrators: {error}
      </div>
    );
  }

  const admins = data?.results ?? [];

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL no.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Has Access to</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-muted-foreground">
                No administrators found.
              </td>
            </tr>
          ) : (
            admins.map((admin, i) => (
              <AdministratorTableRow
                key={admin.user_id}
                index={(page - 1) * pageSize + i + 1}
                admin={admin}
              />
            ))
          )}
        </TableBody>
      </Table>

      <Pagination className="pt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {/* Simple numeric pagination: show up to 5 pages around current */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, page - 3),
              Math.max(0, page - 3) + 5
            )
            .map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(totalPages, p + 1));
              }}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
