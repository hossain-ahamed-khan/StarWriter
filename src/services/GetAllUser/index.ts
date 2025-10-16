"use client";

export async function getAllUser() {
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

        const response = await fetch(`${apiUrl}admin_dashboard/user-list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching all users:', error);
    }
}