import Logo from "@/components/Logo";
import { Card, CardHeader } from "@/components/ui/card";

import UserAvatar from "@/components/UserAvatar";
import MenuUser from "@/components/MenuUser";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <Card className="rounded-none shadow-md bg-white">
      <CardHeader className="flex flex-col md:flex-row items-center md:justify-between px-10">
        <div className="flex items-center gap-3">
          <Logo width={80} height={80} />
          <h2 className="text-4xl font-normal">{title}</h2>
        </div>

        <MenuUser>
          <UserAvatar/>
        </MenuUser>
      </CardHeader>
    </Card>
  );
}
