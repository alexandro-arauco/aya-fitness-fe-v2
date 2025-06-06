import UserForm from "@/components/dashboard/UserForm";
import HeaderProfile from "@/components/profile/HeaderProfile";
import UserProfileForm from "@/components/profile/UserProfileForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <HeaderProfile />
      <div className="py-5 px-10">
        <Tabs defaultValue="account">
          <TabsList className="mx-auto flex w-full bg-white p-8 space-x-3 rounded-md shadow-md">
            <TabsTrigger
              className="flex-none w-[100px]
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
              className="flex-none w-[100px]
               data-[state=active]:bg-black 
               data-[state=active]:text-white 
               data-[state=active]:font-bold 
               px-4 py-4 rounded-md 
               bg-gray-300 text-black cursor-pointer hover:underline"
              value="password"
            >
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="px-10">
              <CardContent className="w-1/2 mx-auto">
                <UserProfileForm userId={+id} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
