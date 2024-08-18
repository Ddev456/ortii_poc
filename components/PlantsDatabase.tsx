import { columns } from "./plantsDatabase/columns";
import { DataTable } from "./plantsDatabase/data-table";
import { plants } from "./plantsDatabase/plants";

export const PlantsDatabase = () => {
  return (     
  <div className="p-8 h-screen bg-slate-200"> 
    <h3 className="text-xl font-bold mb-4">Base de données des plantes</h3>
    <DataTable columns={columns} data={plants} />
  </div>
  );
};