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
import ExercisesAssessment from "./ExercisesAssessment";

export default function ButtonNewAssessment() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-bold focus:outline-none">
          <PlusIcon />
          Upload Assessment
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-1/2">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Upload Assessment</AlertDialogTitle>
            <AlertDialogCancel className="border-none shadow-none">
              <XIcon className="hover:opacity-55 cursor-pointer" />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <ExercisesAssessment />
      </AlertDialogContent>
    </AlertDialog>
  );
}
