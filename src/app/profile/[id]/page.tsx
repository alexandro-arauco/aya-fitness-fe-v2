import Header from "@/components/Header";

interface PageProps {
  params: { id: string };
}

export default function ClientProfilePage({ params }: PageProps) {
  const { id } = params;
  return (
    <>
      <Header title="Profile" />
      <div>{id}</div>
    </>
  );
}
