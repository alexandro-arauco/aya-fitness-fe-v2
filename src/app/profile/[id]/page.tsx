import AssessmentsList from "@/components/profile/AssessmentsList";
import HeaderProfile from "@/components/profile/HeaderProfile";
import UserProfileForm from "@/components/profile/UserProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <HeaderProfile userId={+id} />
      <div className="py-5 px-10">
        <Tabs defaultValue="account">
          <TabsList className="mx-auto flex w-full bg-white p-8 space-x-3 rounded-md shadow-md">
            <TabsTrigger
              className="flex-none
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md
               bg-gray-300 text-black cursor-pointer hover:underline"
              value="account"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="flex-none
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md
               bg-gray-300 text-black cursor-pointer hover:underline"
              value="password"
            >
              Assessments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="rounded-md">
              <CardContent className="w-1/2 mx-auto">
                <UserProfileForm userId={+id} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="rounded-md">
              <CardContent className="w-full mx-auto">
                <AssessmentsList userId={+id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
