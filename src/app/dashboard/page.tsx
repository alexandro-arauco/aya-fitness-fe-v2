import Menu from "@/components/dashboard/Menu";
import Header from "@/components/Header";
import Table from "@/components/Table";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />

      <div className="px-10 py-5 space-y-4">
        <Menu />
        <Table
          data={[]}
          columns={[]}
          totalItems={1}
          itemsPerPage={1}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    </>
  );
}
