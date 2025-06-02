import { Avatar } from "@/components/ui/avatar";

interface UserAvatarProps {
  text: string;
}

export default function UserAvatar({ text }: UserAvatarProps) {
  return (
    <Avatar className="bg-gray-300 flex items-center justify-center w-15 h-15 font-bold text-2xl tracking-widest">
      {text}
    </Avatar>
  );
}
