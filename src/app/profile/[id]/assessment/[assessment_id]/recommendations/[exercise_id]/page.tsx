import Header from "@/components/Header";
import RecommendationPage from "@/components/recommendation/RecommendationPage";

interface PageProps {
  params: Promise<{
    id: number;
    assessment_id: number;
    exercise_id: number;
  }>;
}

export default async function RecommendationsPage({ params }: PageProps) {
  const { id: client_id, assessment_id, exercise_id } = await params;
  return (
    <>
      <Header
        title="Assessment Recommendations"
        menuItems={[
          {
            label: "Dashboard",
            link: "/dashboard",
          },
          {
            label: "Assessment Summary",
            link: `/profile/${client_id}/assessment/${assessment_id}`,
          },
        ]}
      />

      <RecommendationPage
        clientId={client_id}
        assessmentId={assessment_id}
        exerciseId={exercise_id}
      />
    </>
  );
}
