import Header from "@/components/Header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <Header title="Profile" />
      <div>{id}</div>
    </>
  );
}
