import { Column } from "@/components/Table";
import { ClientTable, Gym } from "@/schemas/dashboard-schema";

export const columnsGymsList: Column<Gym>[] = [
  {
    key: "first_name",
    header: "Name",
    render: (item) => `${item.first_name} ${item.last_name}`,
  },
  {
    key: "job_title",
    header: "Job Title",
  },
  {
    key: "gym_name",
    header: "Gym Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "city",
    header: "City - State/Province",
    render: (item) => `${item.city} - ${item.state_province}`,
  },
  {
    key: "phone_number",
    header: "Phone #",
    render: (item) => item.phone_number || "----",
  },
];

export const columnsClientsList: Column<ClientTable>[] = [
  {
    key: "first_name",
    header: "Member Name",
    render: (item) => `${item.first_name} ${item.last_name}`,
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "fitness_level",
    header: "Fitness Level",
    render: (item) =>
      item.fitness_level
        ? item.fitness_level.charAt(0).toUpperCase() + item.fitness_level.slice(1)
        : "---",
  },
  {
    key: "last_assessment",
    header: "Last Assessment",
    render: (item) => item.last_assessment ?? "----",
  },
];
