import Header from "@/components/Header";
import HeaderProfile from "@/components/profile/HeaderProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <HeaderProfile />
      <div>{id}</div>
    </>
  );
}
