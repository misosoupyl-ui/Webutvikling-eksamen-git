import type { IFinance } from "../interfaces/IFinance";

const FinancialSituation = ({ finance }: { finance: IFinance }) => {
  return (
    <section className="p-4 bg-slate-800 rounded-xl text-white">
      <h2 className="text-2xl font-semibold mb-4">Financial situation</h2>

      <div className="space-y-2">
        <p>
          Money left:{" "}
          <span className="font-semibold">
            {finance.moneyLeft.toLocaleString()}
          </span>
        </p>

        <p>
          Number of purchases:{" "}
          <span className="font-semibold">{finance.numberOfPurchases}</span>
        </p>

        <p>
          Money spent:{" "}
          <span className="font-semibold">
            {finance.moneySpent.toLocaleString()}
          </span>
        </p>
      </div>
    </section>
  );
};

export default FinancialSituation;
