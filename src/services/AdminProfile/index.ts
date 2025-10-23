"use client";

// Admin Profile types
export type AdminProfile = {
	user_id: number;
	full_name: string;
	email: string;
	phone_number: string | null;
	location?: string | null;
	referralSource?: string | null;
	role: string; // e.g., 'admin' | 'moderator' | 'superadmin'
};

export type UpdateAdminProfilePayload = {
	email: string;
	role?: string; // 'admin' | 'moderator' | 'superadmin' (backend values)
	full_name: string;
	phone_number: string;
};

export type UpdateAdminProfileResponse = {
	status: string; // 'success' | 'error'
	message: string;
	data?: AdminProfile;
};

// Fetch the current admin user's profile
export type GetAdminProfileResponse = {
	status: string; // 'success' | 'error'
	message: string;
	data: AdminProfile;
};

export async function getAdminProfile(): Promise<GetAdminProfileResponse> {
	const accessToken = typeof window !== 'undefined' ? localStorage.getItem('admin_access_token') : null;
	if (!accessToken || accessToken.trim() === '') {
		throw new Error('Access token not found');
	}

	const apiUrl = process.env.NEXT_PUBLIC_BASE_API;
	if (!apiUrl) {
		throw new Error('API URL is not configured in environment variables');
	}

	const res = await fetch(`${apiUrl}admin_dashboard/admin-profile/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		cache: 'no-store',
	});

	const text = await res.text();
	let json: any;
	try { json = text ? JSON.parse(text) : {}; } catch { json = { message: text }; }

	if (!res.ok) {
		const message = json?.message || `HTTP error! status: ${res.status}`;
		throw new Error(message);
	}

	// Expect shape like:
	// {
	//   "status": "success",
	//   "message": "Profile updated successfully",
	//   "data": {
	//       "user_id": 72,
	//       "full_name": "Ankara Messi",
	//       "email": "admin@example.com",
	//       "phone_number": "0195753454345",
	//       "location": null,
	//       "referralSource": null,
	//       "role": "superadmin"
	//   }
	// }
	return json as GetAdminProfileResponse;
}

// Update the current admin user's profile
export async function updateAdminProfile(payload: UpdateAdminProfilePayload, userId: number): Promise<UpdateAdminProfileResponse> {
	try {
		const accessToken = typeof window !== 'undefined' ? localStorage.getItem('admin_access_token') : null;
		if (!accessToken || accessToken.trim() === '') {
			throw new Error('Access token not found');
		}

		const apiUrl = process.env.NEXT_PUBLIC_BASE_API;
		if (!apiUrl) {
			throw new Error('API URL is not configured in environment variables');
		}

		// NOTE: Endpoint inferred from backend conventions used elsewhere in the app.
		// Adjust the path if your backend differs.
		const res = await fetch(`${apiUrl}admin_dashboard/admins-update/${userId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(payload),
		});

		const text = await res.text();
		let json: any;
		try { json = text ? JSON.parse(text) : {}; } catch { json = { message: text }; }

		if (!res.ok) {
			const message = json?.message || `HTTP error! status: ${res.status}`;
			throw new Error(message);
		}

		// Expect: { status: 'success', message: 'Admin user updated successfully', data: { ... } }
		return json as UpdateAdminProfileResponse;
	} catch (error: any) {
		console.error('Error updating admin profile:', error);
		return {
			status: 'error',
			message: error?.message || 'Failed to update admin profile',
		};
	}
}

