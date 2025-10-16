'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAdminProfile, updateAdminProfile } from "@/services/AdminProfile";
import { toast } from "sonner";

const schema = z.object({
    full_name: z.string().min(2, "Name is required"),
    email: z.string().email(),
    phone_number: z.string().min(10, "Phone number is required"),
});

type FormValues = z.infer<typeof schema>;

export default function EditProfile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [role, setRole] = useState<string>("");
    const [userId, setUserId] = useState<number | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    // Fetch the latest admin profile and populate the form
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                setIsLoadingProfile(true);
                const res = await getAdminProfile();
                if (!active) return;
                const p = res?.data ?? {} as any;

                // Populate form fields (role is shown read-only, not part of form schema)
                reset({
                    full_name: p.full_name ?? '',
                    email: p.email ?? '',
                    phone_number: p.phone_number ?? '',
                });

                // Keep role separate since it is display-only
                setRole(p.role ?? '');
                setUserId(typeof p.user_id === 'number' ? p.user_id : null);

            } catch (e: any) {
                // Optionally surface an error toast for visibility
                try { /* avoid noisy UI in all contexts */ } catch {}
            } finally {
                if (active) setIsLoadingProfile(false);
            }
        })();
        return () => { active = false };
    }, [reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);

            const payload = {
                email: data.email,
                full_name: data.full_name,
                phone_number: data.phone_number,
            };

            if (userId == null) {
                throw new Error('User ID is missing. Please reload the page and try again.');
            }

            const res = await updateAdminProfile(payload, userId);
            if ((res.status || '').toLowerCase() !== 'success') {
                throw new Error(res.message || 'Failed to update profile');
            }

            toast.success(res.message || 'Profile updated successfully');

            // Close dialog by clicking the cancel button programmatically if present
            try {
                const cancelBtn = document.querySelector('[data-edit-profile-cancel]') as HTMLButtonElement | null;
                cancelBtn?.click();
            } catch {}

            // Reload page to show updated data (delay slightly so toast is visible)
            try {
                if (typeof window !== 'undefined') {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch {}
        } catch (err: any) {
            toast.error(err?.message || 'Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Common input classes for consistency
    const inputClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500";
    const selectClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Name</label>
                    <input
                        {...register("full_name")}
                        className={inputClasses}
                        placeholder="John Doe"
                        disabled={isLoadingProfile || isSubmitting}
                        aria-disabled={isLoadingProfile || isSubmitting}
                    />
                </div>
                {errors.full_name && <p className="text-red-500 text-sm mt-1">{(errors.full_name as any).message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className={inputClasses}
                        placeholder="new1email@example.com"
                        disabled={isLoadingProfile || isSubmitting}
                        aria-disabled={isLoadingProfile || isSubmitting}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Phone</label>
                    <input
                        type="tel"
                        {...register("phone_number")}
                        className={inputClasses}
                        placeholder="+1234567890"
                        disabled={isLoadingProfile || isSubmitting}
                        aria-disabled={isLoadingProfile || isSubmitting}
                    />
                </div>
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{(errors.phone_number as any).message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Role</label>
                    <select
                        className={selectClasses}
                        disabled
                        aria-disabled="true"
                        title="Role is managed by the system"
                    >
                        <option value={role || ''}>{role || '—'}</option>
                    </select>
                </div>
            </div>

            <div className="w-full flex justify-between gap-4 mt-10">
                <AlertDialogCancel asChild>
                    <Button data-edit-profile-cancel variant="outline" className="w-1/2 text-[#006699] border-[#006699] rounded-lg py-6 cursor-pointer hover:bg-blue-50">
                        Cancel
                    </Button>
                </AlertDialogCancel>
                <Button disabled={isSubmitting || isLoadingProfile} type="submit" className="w-1/2 bg-[#006699] py-6 rounded-lg text-white cursor-pointer hover:bg-[#005580]">
                    {isSubmitting ? 'Saving...' : (isLoadingProfile ? 'Loading...' : 'Save')}
                </Button>
            </div>
        </form>
    );
}