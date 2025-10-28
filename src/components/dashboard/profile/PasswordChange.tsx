"use client";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changePassword } from "@/services/ChangePassword";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PasswordChange() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset previous messages
        setError("");
        setSuccess("");

        // Client-side validation
        if (newPassword !== retypePassword) {
            setError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        try {
            // Create FormData to match the server action expectation
            const formData = new FormData();
            formData.append('old_password', oldPassword);
            formData.append('new_password', newPassword);
            formData.append('confirm_password', retypePassword);

            const result = await changePassword(formData);

            if (result.success) {
                setSuccess(result.message || "Password changed successfully!");
                // Reset fields on success
                setOldPassword("");
                setNewPassword("");
                setRetypePassword("");

                // Logout
                localStorage.removeItem('admin_access_token');
                localStorage.removeItem('admin_refresh_token');
                localStorage.removeItem('admin_user_role');
                localStorage.removeItem('admin_full_name');

                toast.success('Logged out successfully');
                router.push('/admin-login');
            } else {
                setError(result.error || "Failed to change password. Please try again.");
            }
        }
        catch (error: any) {
        console.error('Error changing password');
        setError("An unexpected error occurred. Please try again.");
    }
};

return (
    <div className="p-4 mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full flex items-center">
                <label className="w-1/2 font-medium mb-1">Old Password</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="w-full flex items-center">
                <label className="w-1/2 font-medium mb-1">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="w-full flex items-center">
                <label className="w-1/2 font-medium mb-1">Re-type New Password</label>
                <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className={`w-1/2 border rounded-lg px-3 py-2 focus:outline-none ${newPassword && retypePassword
                        ? newPassword === retypePassword
                            ? "focus:ring-2 focus:ring-green-500"
                            : "focus:ring-2 focus:ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                        }`}
                    required
                />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <div className="w-full flex justify-between gap-4 mt-10">
                <AlertDialogCancel asChild>
                    <Button
                        variant="outline"
                        className="w-1/2 text-[#006699] border-[#006699] rounded-lg py-6 cursor-pointer"
                    >
                        Cancel
                    </Button>
                </AlertDialogCancel>
                <Button
                    type="submit"
                    className="w-1/2 bg-[#006699] py-6 rounded-lg text-white cursor-pointer"
                >
                    Update
                </Button>
            </div>
        </form>
    </div>
);
}
