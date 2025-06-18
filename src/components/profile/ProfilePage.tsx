"use client";

import HeaderProfile from "@/components/profile/HeaderProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import AssessmentsList from "./AssessmentsList";
import UserProfileForm from "./UserProfileForm";

interface ProfoilePageProps {
  id: number;
}

export default function ProfilePage({ id }: ProfoilePageProps) {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");
  const title =
    information && information.type === "admin" ? "Customer" : "Member";

  const [tabSelected, setTabSelected] = useState<string>("Profile");

  return (
    <>
      <HeaderProfile userId={id} title={`${title} ${tabSelected}`} />
      <div className="py-5 px-10">
        <Tabs
          defaultValue="profile"
          onValueChange={(e) =>
            setTabSelected(e.charAt(0).toUpperCase() + e.slice(1))
          }
        >
          <TabsList className="mx-auto flex w-full bg-white p-8 space-x-3 rounded-md shadow-md">
            <TabsTrigger
              className="flex-none
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md
               bg-gray-300 text-black cursor-pointer hover:underline"
              value="profile"
            >
              Profile
            </TabsTrigger>
            {information?.type !== "admin" ? (
              <TabsTrigger
                className="flex-none
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md
               bg-gray-300 text-black cursor-pointer hover:underline"
                value="assessments"
              >
                Assessments
              </TabsTrigger>
            ) : null}
          </TabsList>

          <TabsContent value="profile">
            <Card className="rounded-md">
              <CardContent className="w-1/2 mx-auto">
                <UserProfileForm userId={+id} />
              </CardContent>
            </Card>
          </TabsContent>
          {information?.type !== "admin" ? (
            <TabsContent value="assessments">
              <Card className="rounded-md">
                <CardContent className="w-full mx-auto">
                  <AssessmentsList userId={+id} />
                </CardContent>
              </Card>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </>
  );
}
