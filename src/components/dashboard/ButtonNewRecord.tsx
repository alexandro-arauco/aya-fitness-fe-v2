"use client";

import GymForm from "@/components/dashboard/GymForm";
import UserForm from "@/components/dashboard/UserForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { PlusIcon, XIcon } from "lucide-react";

export default function ButtonNewRecord() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold cursor-pointer">
          <PlusIcon />
          Add {information && information.type === "admin" ? "Gym" : "Member"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-5/12">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>
              Add New{" "}
              {information && information.type === "admin" ? "Gym" : "Member"}
            </AlertDialogTitle>
            <AlertDialogCancel className="border-none shadow-none">
              <XIcon className="hover:opacity-55 cursor-pointer" />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        {information && information.type === "admin" && (
          <GymForm userId={information.id} />
        )}

        {information && information.type === "gym" && (
          <UserForm userId={information.id} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
