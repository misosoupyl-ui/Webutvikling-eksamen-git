import { useEffect, useState } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";

const FinancialSituation = () => {
    // tabellen har bare en rad
    const [finance, setFinance] = useState<IFinance | null>(null);


    // Statusmelding
    const [statusMessage, setStatusMessage] = useState<string>("");

    useEffect(() => {
        const loadFinance = async () => {
            const data = await FinanceService.getFinance();

            if (data) {
                setFinance(data);
            } else {
                setStatusMessage("Could not load finance data.");
            }
        };

        loadFinance();
    }, []);

    if (!finance) {
        return(
            <section className="p-4 bg-slate-800 rounded-xl text-white">
                <h2 >Financial situation</h2>

            </section>
        )
    }
}