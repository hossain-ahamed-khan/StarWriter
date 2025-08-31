'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const schema = z.object({
    Name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is required"),
    role: z.enum(["admin", "superAdmin"], {
        errorMap: () => ({ message: "Select a role" }),
    }),
});

export default function EditProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Call API or mutate state
    };

    // Common input classes for consistency
    const inputClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const selectClasses = "bg-white text-gray-900 border border-gray-300 rounded-lg w-1/2 p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Name</label>
                    <input
                        {...register("Name")}
                        className={inputClasses}
                        defaultValue={"Ovie Rahaman Sheikh"}
                    />
                </div>
                {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className={inputClasses}
                        defaultValue={"ovierahaman1@gmail.com"}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Phone</label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className={inputClasses}
                        defaultValue={"+88084454556444"}
                    />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2 text-gray-700">Role</label>
                    <select
                        {...register("role")}
                        className={selectClasses}
                        defaultValue={"admin"}
                        disabled
                    >
                        <option value="">Select a Role</option>
                        <option value="admin">Admin</option>
                        <option value="superAdmin">Super Admin</option>
                    </select>
                </div>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>

            <div className="w-full flex justify-between gap-4 mt-10">
                <AlertDialogCancel asChild>
                    <Button variant="outline" className="w-1/2 text-[#006699] border-[#006699] rounded-lg py-6 cursor-pointer hover:bg-blue-50">
                        Cancel
                    </Button>
                </AlertDialogCancel>
                <Button type="submit" className="w-1/2 bg-[#006699] py-6 rounded-lg text-white cursor-pointer hover:bg-[#005580]">
                    Save
                </Button>
            </div>
        </form>
    );
}