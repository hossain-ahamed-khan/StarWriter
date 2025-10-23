"use client";

export async function deleteUser(user_id: number): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const accessToken = typeof window !== 'undefined'
      ? localStorage.getItem("admin_access_token")
      : null;

    if (!accessToken || accessToken.trim() === "") {
      throw new Error("Access token not found");
    }

    const apiUrl = process.env.NEXT_PUBLIC_BASE_API;
    if (!apiUrl) {
      throw new Error("API URL is not configured in environment variables");
    }

    // Assumption: The DELETE endpoint follows the pattern of the list endpoint with an ID segment
    // e.g., `${apiUrl}admin_dashboard/user-list/{serialNumber}/`
    const url = `${apiUrl}admin_dashboard/delete-user/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
        body: JSON.stringify({ user_id }),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => res.statusText);
      throw new Error(`Failed to delete user (${user_id}): ${res.status} ${msg}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}
