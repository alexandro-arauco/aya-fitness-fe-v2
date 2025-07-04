import Header from "@/components/Header";
import AssessmentClientPage from "@/components/profile/AssessmentClientPage";
import { MenuItem } from "@/interfaces/menu/menu";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
    assessment_id: string;
  }>;
}

export default async function ClientAssessmentPage({ params }: PageProps) {
  const { id: client_id, assessment_id } = await params;

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "Assessment Profile",
      link: `/profile/${client_id}`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Strength Assessment Summary Report"
        menuItems={menuItems}
      />

      <AssessmentClientPage
        assessmentId={+assessment_id}
        clientId={+client_id}
      />

      <footer className="flex flex-col px-10 py-5 text-gray-500 mt-auto">
        <div className="flex items-center">
          <div className="mx-auto">
            Monitoring biometric data is crucial for health. Regular assessments
            can lead to better lifestyle choices and improved overall
            well-being.
          </div>
        </div>
        <Link href="https://www.ayafitness.com" className="text-center">
          www.ayafitness.com
        </Link>
      </footer>
    </div>
  );
}
