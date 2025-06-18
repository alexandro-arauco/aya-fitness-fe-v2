import ProfilePage from "@/components/profile/ProfilePage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;

  return <ProfilePage id={+id} />;
}
