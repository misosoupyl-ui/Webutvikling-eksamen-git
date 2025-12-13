import { useEffect, useState } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";

import FinancialSituation from "../components/FinancialSituation";
import LoanSection from "../components/LoanSection";
// PurchaseSection kommer etterpå

const DashboardPage = () => {
  const [finance, setFinance] = useState<IFinance | null>(null);

  const fetchFinance = async () => {
    const data = await FinanceService.getFinance();
    setFinance(data);
  };

  useEffect(() => {
    fetchFinance();
  }, []);

  return (
    <section className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-5xl font-bold mb-6">DashboardPage</h1>

      {/* Loading */}
      {!finance && <p>Loading finance...</p>}

      {/* Section 1 */}
      {finance && <FinancialSituation finance={finance} />}

      {/* Section 2 */}
      {finance && (
        <div className="mt-6">
          <LoanSection onFinanceUpdated={setFinance} />
        </div>
      )}

      {/* Section 3 kommer etterpå */}
    </section>
  );
};

export default DashboardPage;
