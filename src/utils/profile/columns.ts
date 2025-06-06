import { Column } from "@/components/Table";
import { AssessmentsResponse } from "@/interfaces/profile-assessment/profile-assessment";

export const columns: Column<AssessmentsResponse>[] = [
  {
    key: "created_at",
    header: "Created At",
  },
  {
    key: "exercises",
    header: "Exercises",
    render: (item) => item.exercises.replace(/,(?!\s)/g, ", "),
  },
  {
    key: "trainer_name",
    header: "Trainer Name",
  },
];
