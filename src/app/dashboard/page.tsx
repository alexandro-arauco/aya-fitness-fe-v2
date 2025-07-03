import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import Menu from "@/components/dashboard/Menu";
import UsersTable from "@/components/dashboard/UsersTable";

export default function DashboardPage() {
  return (
    <>
      <HeaderDashboard />

      <div className="px-3 md:px-10 py-5 space-y-4">
        <Menu />
        <div className="overflow-x-auto">
          <UsersTable />
        </div>
      </div>
    </>
  );
}
