"use client";

export type OverviewSuccess = {
    total_users: number;
    todays_new_users: number;
    total_subscribers: number;
    total_earned: number;
    admin_full_name: string;
    success?: true;
};

export type OverviewError = {
    success: false;
    error: string;
};

export const OverView = async (): Promise<OverviewSuccess | OverviewError> => {
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

        const res = await fetch(`${apiUrl}admin_dashboard/dashboard-overview/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }

        const result = await res.json();
        return { ...result, success: true } as OverviewSuccess;
    }
    catch (error: any) {
        console.error('Error in OverView:', error);
        return {
            success: false,
            error: error?.message || 'Failed to fetch dashboard overview'
        } as OverviewError;
    }
}