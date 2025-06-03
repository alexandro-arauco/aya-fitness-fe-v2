import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserForm from "./UserForm";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import GymForm from "./GymForm";

export default function ButtonNewRecord() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold cursor-pointer">
          <PlusIcon />
          Add Member
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-5/12">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Add New</AlertDialogTitle>
            <AlertDialogCancel>
              <XIcon className="hover:opacity-55 cursor-pointer" />
            </AlertDialogCancel>
          </div>
          {/* <UserForm /> */}
          <GymForm />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
