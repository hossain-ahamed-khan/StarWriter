'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const schema = z.object({
    Id: z.string().min(1),
    workType: z.enum(["Earthworks-1", "Earthworks-2", "Earthworks-3"], {
        errorMap: () => ({ message: "Select a work Type" }),
    }),
    detection: z.string().min(5),
    phone: z.string().min(10, "Phone number is required"),
    severity: z.enum(["medium", "high"], {
        errorMap: () => ({ message: "Select Severity" }),
    }),
    controlPoints: z.string().min(2),
    tecnicalDocumentation: z.string().min(2),
    consequences: z.string().min(2),
    measures: z.string().min(2),
    image: z.string().min(2),
});

export default function AddDetection() {
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
                    <label className="font-medium w-1/2">ID</label>
                    <input {...register("Id")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.Id && <p className="text-red-500 text-sm">{errors.Id.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Work Type</label>
                    <select
                        {...register("workType")}
                        className="input border rounded-lg w-1/2 p-1.5"
                    >
                        <option value="Earthworks-1">Earthworks 1</option>
                        <option value="Earthworks-2">Earthworks 2</option>
                        <option value="Earthworks-3">Earthworks 3</option>
                    </select>
                </div>
                {errors.workType && <p className="text-red-500 text-sm">{errors.workType.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Detection</label>
                    <textarea {...register("detection")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.detection && <p className="text-red-500 text-sm">{errors.detection.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Severity</label>
                    <select
                        {...register("severity")}
                        className="input border rounded-lg w-1/2 p-1.5"
                    >
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                {errors.severity && <p className="text-red-500 text-sm">{errors.severity.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Control Points</label>
                    <input {...register("controlPoints")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.controlPoints && <p className="text-red-500 text-sm">{errors.controlPoints.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Technical Documentation</label>
                    <textarea {...register("tecnicalDocumentation")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.tecnicalDocumentation && <p className="text-red-500 text-sm">{errors.tecnicalDocumentation.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Consequences</label>
                    <textarea {...register("consequences")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.consequences && <p className="text-red-500 text-sm">{errors.consequences.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Measures</label>
                    <textarea {...register("measures")} className="input border rounded-lg w-1/2 py-1.5 px-2" />
                </div>
                {errors.measures && <p className="text-red-500 text-sm">{errors.measures.message}</p>}
            </div>

            <div>
                <div className="w-full flex justify-between items-center">
                    <label className="font-medium w-1/2">Image</label>
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
