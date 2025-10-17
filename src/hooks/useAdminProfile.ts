"use client";
import { useEffect, useState } from 'react';
import { getAdminProfile, type AdminProfile } from '@/services/AdminProfile';

export function useAdminProfile() {
  const [data, setData] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAdminProfile()
      .then((res) => {
        if (!mounted) return;
        setData(res.data);
      })
      .catch((e: any) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load admin profile');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error } as const;
}
