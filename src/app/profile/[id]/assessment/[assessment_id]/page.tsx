import Header from "@/components/Header";
import AssessmentClientPage from "@/components/profile/AssessmentClientPage";

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

      <AssessmentClientPage
        assessmentId={+assessment_id}
        clientId={+client_id}
      />
    </>
  );
}
