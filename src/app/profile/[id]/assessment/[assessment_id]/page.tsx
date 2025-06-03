import Header from "@/components/Header";

interface PageProps {
  params: Promise<{
    id: string;
    assessment_id: string;
  }>;
}

export default async function ClientAssessmentPage({ params }: PageProps) {
  const { id: client_id, assessment_id } = await params;

  return (
    <>
      <Header title="Client Assessment - Evaluation Data" />
      <div>
        {client_id} {assessment_id}
      </div>
    </>
  );
}
