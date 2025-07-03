import LoginForm from "@/components/login/LoginForm";
import Logo from "@/components/Logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 md:px-0">
      <Card className="rounded-md shadow-2xl w-full md:w-1/3 space-y-3">
        <CardHeader className="justify-center items-center space-y-3">
          <Logo defaultLogo="/logo.png" />

          <div className="flex flex-row space-x-2 mx-auto items-center">
            <div className="text-2xl font-bold">AYA</div>
            <div className="text-2xl font-normal italic">FITNESS</div>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
