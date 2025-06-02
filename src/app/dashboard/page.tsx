import Menu from "@/components/dashboard/Menu";
import UsersTable from "@/components/dashboard/UsersTable";
import Header from "@/components/Header";
import Table from "@/components/Table";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />

      <div className="px-10 py-5 space-y-4">
        <Menu />
        <UsersTable />
      </div>
    </>
  );
}
