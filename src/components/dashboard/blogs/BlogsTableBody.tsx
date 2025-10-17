"use client";

import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import BlogsTableRow from "./BlogsTableRow";
import { Blogs, BlogApiResponse, BlogError, BlogPost } from "@/services/Blogs";

export default function BlogsTableBody() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = (await Blogs()) as BlogApiResponse | BlogError;
        if (!active) return;
        if ("data" in res) {
          setRows(res.data || []);
          setError(null);
        } else {
          setError(res.error || "Failed to fetch blogs");
        }
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Something went wrong fetching blogs");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    // Simple loading placeholder rows
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <TableRow key={`loading-${i}`}>
            <TableCell colSpan={6}>
              <div className="animate-pulse h-4 w-full bg-gray-200 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        <TableRow>
          <TableCell colSpan={6} className="text-red-600">
            {error}
          </TableCell>
        </TableRow>
      </>
    );
  }

  if (!rows.length) {
    return (
      <>
        <TableRow>
          <TableCell colSpan={6} className="text-muted-foreground">
            No blogs found
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      {rows.map((blog, idx) => (
        <BlogsTableRow
          key={blog.id}
          index={idx + 1}
          blog={blog}
          onDeleted={() => setRows((prev) => prev.filter((b) => b.id !== blog.id))}
        />
      ))}
    </>
  );
}
