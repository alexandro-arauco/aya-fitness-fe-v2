export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <>Client Profile {id}</>;
}
