import Header from "@/components/Header";

export default function ClientProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <>
      <Header title="Profile" />
    </>
  );
}
