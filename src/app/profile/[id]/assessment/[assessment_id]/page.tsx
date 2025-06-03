import Header from "@/components/Header";

export default function ClientAssessmentPage({
  params,
}: {
  params: { id: string; assessment_id: string };
}) {
  const { id: client_id, assessment_id } = params;

  return (
    <>
      <Header title="Client Assessment - Evaluation Data" />
      <div>
        {client_id} {assessment_id}
      </div>
    </>
  );
}
