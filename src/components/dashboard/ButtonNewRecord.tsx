import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import UserForm from "./UserForm";

export default function ButtonNewRecord() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold">
          <PlusIcon />
          Add Member
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-5/12">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New</AlertDialogTitle>

          <UserForm />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
