import Header from "@/components/Header";

interface PageProps {
  params: { id: string; assessment_id: string };
}

export default function ClientAssessmentPage({ params }: PageProps) {
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
