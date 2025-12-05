import type { IAthlete } from "../interfaces/IAthlete";

import axios from "axios";

const athleteEndpoint = "http://localhost:5105/athlete";

//Anbefalt av Rolando i forelesning 20 1:27:20, anbefalte både en try catch og returnere array
const getAllAthletes = async (): Promise<IAthlete[]> => {
  try {
    const response = await axios.get<IAthlete[]>(athleteEndpoint);
    return response.data;
  } catch (error) {
    // Vi valgte å bruke console.error-> https://dev.to/johongirr/consolelog-consoleerror-consoleassert-and-more-1lf
    console.error("Error:", error);
    return [];
  }
};

const getAthletesById = async (id: number): Promise<IAthlete | null> => {
  try {
    const response = await axios.get<IAthlete>(`${athleteEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const postAthletes = async (newAthlete: IAthlete): Promise<IAthlete | null> => {
  try {
    const response = await axios.post<IAthlete>(athleteEndpoint, newAthlete);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const putAthletes = async (
  editedAthlete: IAthlete
): Promise<IAthlete | null> => {
  try {
    const response = await axios.put<IAthlete>(athleteEndpoint, editedAthlete);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const deleteAthletes = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete<IAthlete>(`${athleteEndpoint}/${id}`);
    console.log("Delete response:", response);
  } catch (error) {
    console.error("Error deleting athlete:", error);
  }
};
export default {
  getAllAthletes,
  getAthletesById,
  postAthletes,
  putAthletes,
  deleteAthletes,
};
