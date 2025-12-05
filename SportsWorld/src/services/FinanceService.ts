import type { IFinance } from "../interfaces/IFinance";

import axios from "axios";

const financeEndpoint = "http://localhost:5105/finance";

const getFinance = async (): Promise<IFinance[]> => {
  try {
    const response = await axios.get<IFinance[]>(financeEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const addLoanMoney = async (loanAmount: number): Promise<IFinance | null> => {
  try {
    const response = await axios.put<IFinance>(financeEndpoint, { loanAmount });
    return response.data;
  } catch (error) {
    console.error("Error adding loan", error);
    return null;
  }
};

const updateAfterPurchase = async (
  purchaseAmount: number
): Promise<IFinance | null> => {
  try {
    const response = await axios.put<IFinance>(financeEndpoint, {
      purchaseAmount,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating finance", error);
    return null;
  }
};

export default { getFinance, addLoanMoney, updateAfterPurchase };
