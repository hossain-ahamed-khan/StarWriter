'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createAdministrator } from "@/services/Administrator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
    full_name: z.string().min(2),
    email: z.string().email(),
    phone_number: z.string().min(10, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "superAdmin"], {
        errorMap: () => ({ message: "Select a role" }),
    }),
});

type Props = {
    onCreated?: (result?: { email?: string; role?: string } | null) => void
}

export default function AddAdministrator({ onCreated }: Props) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [serverSuccess, setServerSuccess] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setServerError(null);
        setServerSuccess(null);
        setSubmitting(true);
        try {
            // Map role to backend expected values: superAdmin -> superadmin
            const role = data.role === 'superAdmin' ? 'superadmin' : data.role;

            const res = await createAdministrator({
                full_name: data.full_name,
                email: data.email,
                phone_number: data.phone_number ?? '',
                password: data.password,
                role,
            });
            if (!res.success) {
                throw new Error(res.message || 'Failed to create administrator');
            }

            setServerSuccess(res.message || 'Administrator created successfully');
            reset();
            // Notify other components (e.g., table) to refetch
            try { window.dispatchEvent(new Event('admin-created')); } catch {}
            // Optionally refresh server components
            try { router.refresh(); } catch {}
            // Allow parent to close the dialog
            try { onCreated?.(res?.data ?? null); } catch {}
            toast.success(res.message || 'Administrator created successfully');
        } catch (e: any) {
            setServerError(e?.message ?? 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    // Common input classes for consistency
    const inputClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const selectClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <p className="text-red-600 text-sm">{serverError}</p>
            )}
            {serverSuccess && (
                <p className="text-green-600 text-sm">{serverSuccess}</p>
            )}
            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Name</label>
                    <input {...register("full_name")} className={inputClasses} />
                </div>
                {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Email</label>
                    <input type="email" {...register("email")} className={inputClasses} />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Phone Number</label>
                    <input type="tel" {...register("phone_number")} className={inputClasses} />
                </div>
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className={inputClasses}
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Role */}
            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Role</label>
                    <select
                        {...register("role")}
                        className={selectClasses}
                    >
                        <option value="">Select a Role</option>
                        <option value="admin">Admin</option>
                        <option value="superAdmin">Super Admin</option>
                    </select>
                </div>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <div className="w-full flex justify-between gap-4 mt-10">
                <AlertDialogCancel asChild>
                    <Button variant="outline" className="w-1/2 text-[#006699] border-[#006699] rounded-lg py-6 cursor-pointer" disabled={submitting}>
                        Cancel
                    </Button>
                </AlertDialogCancel>
                <Button type="submit" className="w-1/2 bg-[#006699] py-6 rounded-lg text-white" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create'}
                </Button>
            </div>
        </form>
    );
}
