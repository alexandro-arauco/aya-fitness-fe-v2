"use client";

import { columnsGymsList } from "@/utils/dashboard/columns";
import Table from "@/components/Table";

export default function UsersTable() {
  return (
    <Table
      data={[]}
      columns={columnsGymsList}
      totalItems={1}
      itemsPerPage={1}
    />
  );
}
