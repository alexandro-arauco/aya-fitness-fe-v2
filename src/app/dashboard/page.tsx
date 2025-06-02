import Menu from "@/components/dashboard/Menu";
import Header from "@/components/Header";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />

      <div className="px-10 py-5">
        <Menu />
      </div>
    </>
  );
}
