import Navbar from "../components/Navbar";
import RealisticExpenseCard from "../components/RealisticExpenseCard";
import RecentExpensesTable from "../components/RecentExpensesTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0e1117] flex flex-col items-center justify-start px-3 sm:px-6">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 w-full max-w-6xl">
        <Navbar />
        
        <div className="flex justify-center w-full">
          <RealisticExpenseCard />
        </div>

        {/* Expense Cards Section */}
        <div className="flex justify-center w-full">
          <RecentExpensesTable />
        </div>
      </div>
    </div>
  );
}
