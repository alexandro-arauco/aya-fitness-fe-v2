export default function ClientAssessmentPage({
  params,
}: {
  params: { id: string; assessment_id: string };
}) {
  const { id: client_id, assessment_id } = params;

  return (
    <>
      Client Assessment Page {client_id} {assessment_id}
    </>
  );
}
