import type { IFinance } from "../interfaces/IFinance";
import axios from "axios";

const financeEndpoint = "http://localhost:5105/finance";


 //Henter finance-data.
 //Backend returnerer en liste, men vi bruker kun første element, siden Finance-tabellen kun har en rad.
 
const getAllFinance = async (): Promise<IFinance[]> => {
  try {
    const response = await axios.get<IFinance[]>(financeEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};


 //Henter finance-objektet (en rad)
const getFinance = async (): Promise<IFinance | null> => {
  try {
    const response = await axios.get<IFinance[]>(financeEndpoint);
    return response.data[0] ?? null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


 //Oppdaterer finance (brukes både til lån og kjøp)
 //Backend avgjør hva som oppdateres basert på verdiene
 
const putFinance = async (
  updatedFinance: IFinance
): Promise<IFinance | null> => {
  try {
    const response = await axios.put<IFinance>(
      financeEndpoint,
      updatedFinance
    );
    return response.data;
  } catch (error) {
    console.error("Error updating finance:", error);
    return null;
  }
};

export default { getAllFinance, getFinance, putFinance,};
