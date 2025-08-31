import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AllProjects } from "./AllProjects"

export function AllProjectsFolder() {
    interface Folder {
        folderId: number;
        folderName: string;
    }

    // Your folders array with explicit typing
    const folders: Folder[] = Array.from({ length: 10 }, (_, index) => ({
        folderId: index + 1,
        folderName: `Folder ${index + 1}`
    }));

    return (
        <DialogHeader>
            <DialogTitle className="text-center my-4">All Folders</DialogTitle>
            <DialogDescription className="space-y-4">
                {folders.map((folder) => (
                    <Dialog key={folder.folderId}>
                        <DialogTrigger asChild>
                            <button
                                className="w-full text-left border-2 rounded-md p-2 cursor-pointer"
                                data-folder-id={folder.folderId}
                            >
                                {folder.folderName}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <AllProjects folderId={folder.folderId}
                                folderName={folder.folderName} />
                        </DialogContent>
                    </Dialog>
                ))}
            </DialogDescription>
        </DialogHeader>
    )
}