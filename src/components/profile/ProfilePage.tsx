"use client";

import UsersTable from "@/components/dashboard/UsersTable";
import AssessmentsList from "@/components/profile/AssessmentsList";
import GymProfileForm from "@/components/profile/GymProfileForm";
import HeaderProfile from "@/components/profile/HeaderProfile";
import UserProfileForm from "@/components/profile/UserProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { ClientTable } from "@/schemas/dashboard-schema";
import { useState } from "react";

interface ProfoilePageProps {
  id: number;
}

export default function ProfilePage({ id }: ProfoilePageProps) {
  const { userInfo: information } = useAuth();

  const title =
    information && information.type === "admin" ? "Customer" : "Member";

  const [tabSelected, setTabSelected] = useState<string>("Profile");
  const [clientSelected, setClientSelected] = useState<ClientTable | null>(
    null
  );

  const [currentTab, setCurrentTab] = useState<string>("profile");

  return (
    <>
      <HeaderProfile userId={id} title={`${title} ${tabSelected}`} />
      <div className="px-3 py-5 md:px-10">
        <Tabs
          defaultValue={currentTab}
          value={currentTab}
          onValueChange={(e) => {
            information?.type !== "admin" &&
              setTabSelected(e.charAt(0).toUpperCase() + e.slice(1));

            e === "members-gym" && setClientSelected(null);
            setCurrentTab(e);
          }}
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

            {information?.type === "admin" ? (
              <TabsTrigger
                className="flex-none
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md
               bg-gray-300 text-black cursor-pointer hover:underline"
                value="members-gym"
              >
                Members List
              </TabsTrigger>
            ) : null}

            {(clientSelected || information?.type === "gym") && (
              <TabsTrigger
                className="flex-none
                data-[state=active]:bg-black 
                data-[state=active]:text-white 
                data-[state=active]:font-bold 
                px-4 py-4 rounded-md
                bg-gray-300 text-black cursor-pointer hover:underline"
                value="assessments"
              >
                {`Assessments${
                  information?.type === "admin" && clientSelected
                    ? ` of ${clientSelected.first_name} ${clientSelected.last_name}`
                    : ""
                }`}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile">
            <Card className="rounded-md">
              <CardContent className="w-full md:w-1/2 mx-auto">
                {information?.type === "admin" && (
                  <GymProfileForm userId={+id} />
                )}
                {information?.type === "gym" && (
                  <UserProfileForm userId={+id} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {information?.type === "admin" ? (
            <TabsContent value="members-gym">
              <Card className="rounded-md">
                <CardContent className="w-full mx-auto">
                  <UsersTable
                    userId={id}
                    onSelect={(item: ClientTable) => {
                      setClientSelected(item);
                      setCurrentTab("assessments");
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ) : null}

          {clientSelected || information?.type === "gym" ? (
            <TabsContent value="assessments">
              <Card className="rounded-md">
                <CardContent className="w-full mx-auto">
                  <div className="overflow-x-auto">
                    <AssessmentsList
                      gymId={information?.type === "admin" ? +id : undefined}
                      userId={clientSelected ? clientSelected.id : +id}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </>
  );
}
