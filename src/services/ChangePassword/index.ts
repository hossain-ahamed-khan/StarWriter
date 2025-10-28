"use client";

export const changePassword = async (data: FormData) => {
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

        const res = await fetch(`${apiUrl}/admin_dashboard/password-reset/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: data,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to change password' }));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const responseData = await res.json();

        return {
            success: true,
            message: responseData.message || 'Password changed successfully',
        };

    }
    catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to change password'
        };
    }
}