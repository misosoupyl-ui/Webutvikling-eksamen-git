import type { IAthlete } from "../interfaces/IAthlete";

import axios from "axios";

const endpoint = "http://localhost:5105/athlete";

//Anbefalt av Rolando i forelesning 20 1:27:20
const getAllAthletes = async (): Promise<IAthlete[]> => {
  const response = await axios.get(endpoint);
  return response.data;
};
