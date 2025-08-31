import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import projectDetailsImage from "../../../../public/resources/images/projectDetailsImage.png"

export function AllProjects({ folderId, folderName }: { folderId: number; folderName: string }) {
    interface Project {
        projectId: number;
        projectName: string;
    }

    // Your projects array with explicit typing
    const projects: Project[] = Array.from({ length: 5 }, (_, index) => ({
        projectId: index + 1,
        projectName: `Project ${index + 1}`
    }));

    return (
        <DialogHeader>
            <DialogTitle className="text-center my-4">Projects in {folderName}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
            <div className="space-y-4">
                {projects.map((project) => (
                    <Dialog key={project.projectId}>
                        <DialogTrigger asChild>
                            <button
                                className="w-full text-left border-2 rounded-md p-2 cursor-pointer"
                                data-project-id={project.projectId}
                            >
                                {project.projectName}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center my-4">{project.projectName} Details</DialogTitle>
                                <DialogDescription>
                                    <AspectRatio ratio={16 / 9} className="">
                                        <Image src={projectDetailsImage} alt="Image" className="rounded-md object-cover" />
                                    </AspectRatio>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <p className="text-gray-600">Project ID: {project.projectId}</p>
                                {/* Add your project details content here */}
                                <div className="mt-4">
                                    <p>Project details and content would go here...</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </DialogHeader>
    )
}