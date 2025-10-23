"use client";

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string | null;
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogApiResponse {
  status: string;
  message: string;
  data: BlogPost[];
}

export interface CreateBlogApiResponse {
    status: string;
    message: string;
    data: BlogPost;
}

export type CreateBlogInput = {
    title: string;
    description: string;
    category?: string | null;
    image?: File | null;
};

export type BlogError = {
    success: false;
    error: string;
};

export const Blogs = async (): Promise<BlogApiResponse | BlogError> => {
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

        const res = await fetch(`${apiUrl}admin_dashboard/list-blogs/`, {
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
        return result as BlogApiResponse;
    }
    catch (error: any) {
        console.error('Error in Blogs:', error);
        return {
            success: false,
            error: error?.message || 'Failed to fetch blogs'
        } as BlogError;
    }
}

export const deleteBlog = async (id: number): Promise<{ success: boolean; message?: string; error?: string }> => {
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

        // The backend for similar destructive actions uses POST with JSON body (see DeleteUser service)
        // If your backend expects a DELETE with body instead, switch method back to 'DELETE'.
        const res = await fetch(`${apiUrl}/admin_dashboard/modify-blogs/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id, action: 'delete' }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to delete blog. Status: ${res.status}, message: ${errorText}`);
        }

        let message: string | undefined;
        try {
            const data = await res.json();
            message = (data && (data.message || data.detail)) as string | undefined;
        } catch {
            // No JSON body
        }
        return { success: true, message };
    } catch (error: any) {
        return { success: false, error: error?.message || 'Failed to delete blog' };
    }
}


export const createBlog = async (blogData: CreateBlogInput): Promise<{ success: boolean; message?: string; error?: string }> => {
    // Accepts title, description, optional category and image File; sends multipart/form-data
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

        // Build FormData according to backend expectations
        const formData = new FormData();
        formData.append('title', blogData.title ?? '');
        formData.append('description', blogData.description ?? '');
        if (blogData.category != null) formData.append('category', blogData.category ?? '');
        if (blogData.image instanceof File) {
            formData.append('image', blogData.image, blogData.image.name);
        }

        const res = await fetch(`${apiUrl}/admin_dashboard/create-blogs/`, {
            method: 'POST',
            headers: {
                // Let the browser set the correct Content-Type with boundary
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to create blog. Status: ${res.status}, message: ${errorText}`);
        }

        const data = (await res.json()) as CreateBlogApiResponse;
        return { success: true, message: data?.message ?? 'Blog created successfully.' };
    } catch (error: any) {
        return { success: false, error: error?.message || 'Failed to create blog' };
    }
}