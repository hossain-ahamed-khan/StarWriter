'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";

const schema = z.object({
    notificationTitle: z.string().min(1),
    messageBody: z.string().min(2),
    recipientGroup: z.enum(["all-user", "single-user"], {
        errorMap: () => ({ message: "Select recipient group" }),
    }),
    deliveryTime: z.date(),
    notificationType: z.enum(["announcement", "reminder", "alert"], {
        errorMap: () => ({ message: "Select notification type" }),
    }),
    image: z.string().min(2),
});

export default function AddNotification() {
    const [date, setDate] = React.useState<Date | undefined>(new Date("2025-06-23"))

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Call API or mutate state
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Notification Title*</label>
                    <input {...register("notificationTitle")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.notificationTitle && <p className="text-red-500 text-sm">{errors.notificationTitle.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Message Body*</label>
                    <textarea {...register("messageBody")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.messageBody && <p className="text-red-500 text-sm">{errors.messageBody.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Recipient Group*</label>
                    <select
                        {...register("recipientGroup")}
                        className="input border rounded-lg w-1/2 p-1.5"
                    >
                        <option value="all-user">All Users</option>
                        <option value="single-user">single User</option>
                    </select>
                </div>
                {errors.recipientGroup && <p className="text-red-500 text-sm">{errors.recipientGroup.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Delivery Time*</label>
                    <div className="font-medium w-1/2">
                        <DatePicker {...register("deliveryTime")} date={date} setDate={setDate} />
                    </div>
                </div>
                {errors.deliveryTime && <p className="text-red-500 text-sm">{errors.deliveryTime.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Notification Type*</label>
                    <select
                        {...register("notificationType")}
                        className="input border rounded-lg w-1/2 p-1.5"
                    >
                        <option value="announcement">Announcement</option>
                        <option value="reminder">Reminder</option>
                        <option value="alert">Alert</option>
                    </select>
                </div>
                {errors.notificationType && <p className="text-red-500 text-sm">{errors.notificationType.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Add Image</label>
                    <input {...register("image")} className="input border rounded-lg w-1/2 py-1.5 px-2" placeholder="Upload Images" />
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div className="w-full flex justify-between gap-4 mt-10">
                <AlertDialogCancel asChild>
                    <Button variant="outline" className="w-1/2 text-[#0030A8] border-[#0030A8] rounded-lg py-6 cursor-pointer">
                        Cancel
                    </Button>
                </AlertDialogCancel>
                <Button type="submit" className="w-1/2 bg-[#0030A8] py-6 rounded-lg text-white">Create</Button>
            </div>
        </form>
    );
}
