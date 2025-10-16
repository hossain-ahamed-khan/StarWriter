"use client"
// ---------------------- get administrator list function ---------------------------- 
// Supports server-side pagination via `page` and `pageSize` (page_size) query params.
// Defaults: page=1, pageSize=10
export async function getAdministrators(params?: { page?: number; pageSize?: number }) {
    try {
        const accessToken = typeof window !== "undefined" ? localStorage.getItem("admin_access_token") : null;

        if (!accessToken || accessToken.trim() === "") {
            throw new Error("Access token not found");
        }

        const apiUrl = process.env.NEXT_PUBLIC_BASE_API;
        if (!apiUrl) {
            throw new Error("API URL is not configured in environment variables");
        }

        const page = params?.page ?? 1
        const pageSize = params?.pageSize ?? 10
        const url = new URL(`${apiUrl}admin_dashboard/admin_list/`)
        url.searchParams.set('page', String(page))
        url.searchParams.set('page_size', String(pageSize))

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store", // Ensure fresh data
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching administrators:", error);
        throw error;
    }
}



// ---------------------- create administrator list function ----------------------------

export type CreateAdminPayload = {
    full_name: string
    email: string
    phone_number: string
    role: string // 'admin' | 'superadmin'
    password: string
}

export async function createAdministrator(payload: CreateAdminPayload) {
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

                // Normalize role to match backend expectation
                const role = payload.role === 'superAdmin' ? 'superadmin' : payload.role
                const body = {
                        full_name: payload.full_name ?? '',
                        email: payload.email ?? '',
                        phone_number: payload.phone_number ?? '',
                        role,
                        password: payload.password ?? '',
                }

        const response = await fetch(`${apiUrl}admin_dashboard/create-admins/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        // Expecting shape: { status: 'success', message: string, data: { email: string, role: string } }
        return {
            success: (result?.status ?? '').toLowerCase() === 'success',
            message: result?.message ?? 'Administrator created successfully',
            data: result?.data ?? null,
            raw: result,
        }
    } catch (error) {
        console.error('Error creating administrator:', error)
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to create administrator'
        }
    }
}