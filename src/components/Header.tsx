import Logo from "@/components/Logo";
import { Card, CardHeader } from "@/components/ui/card";

import MenuUser from "@/components/MenuUser";
import UserAvatar from "@/app/UserAvatar";
import { MenuItem } from "@/interfaces/menu/menu";

interface HeaderProps {
  title: string;
  actionsButtons?: React.ReactNode | null;
  menuItems: MenuItem[];
}

export default function Header({
  title,
  actionsButtons = null,
  menuItems,
}: HeaderProps) {
  return (
    <Card className="rounded-none shadow-md bg-white">
      <CardHeader className="flex flex-col md:flex-row items-center md:justify-between px-10">
        <div className="flex items-center gap-3">
          <Logo width={80} height={80} />
          <h2 className="text-xl md:text-4xl font-normal">{title}</h2>
        </div>

        <div className="flex items-center space-x-4">
          {actionsButtons}
          <MenuUser menuItems={menuItems}>
            <UserAvatar />
          </MenuUser>
        </div>
      </CardHeader>
    </Card>
  );
}
