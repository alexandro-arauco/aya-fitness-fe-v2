import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ExercisesAssessment from "./ExercisesAssessment";

export default function ButtonNewAssessment() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="font-bold focus:outline-none cursor-pointer">
          <PlusIcon />
          Upload Assessment
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="md:min-w-1/2 max-h-[80vh] overflow-y-auto min-w-[400px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Upload Assessment</AlertDialogTitle>
            <AlertDialogCancel className="border-none shadow-none cursor-pointer">
              <XIcon className="hover:opacity-55 cursor-pointer" />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <ExercisesAssessment onClose={() => setOpen(false)} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
