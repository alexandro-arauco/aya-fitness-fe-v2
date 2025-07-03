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
import { useState } from "react";

export default function ButtonNewRecord() {
  const [open, setOpen] = useState(false);
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold cursor-pointer">
          <PlusIcon />
          Add {information && information.type === "admin" ? "Gym" : "Member"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="min-w-5/12"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
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
        <div className="overflow-y-auto max-h-[70vh]">
          {information && information.type === "admin" && (
            <GymForm userId={information.id} onClose={() => setOpen(false)} />
          )}

          {information && information.type === "gym" && (
            <UserForm userId={information.id} onClose={() => setOpen(false)} />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
