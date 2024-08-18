import { columns } from "./plantsDatabase/columns";
import { DataTable } from "./plantsDatabase/data-table";
import { plants } from "./plantsDatabase/plants";

export const PlantsDatabase = () => {
  return (      <DataTable columns={columns} data={plants} />

  );
};