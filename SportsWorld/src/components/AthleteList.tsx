import { useState, type ReactNode } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
  // State for å lagre listen av athletes
  // DENNE MÅ FORKLARES BEDRE!!!!!!
  const [athletes, setAthletes] = useState<IAthlete[]>([]);

  const getAthletes = async () => {
    try {
      const data = await AthleteService.getAllAthletes();
      setAthletes(data);
    } catch (error) {
      console.error("Respons feil", error);
    }
  };

  const getAthletesJSX = (): ReactNode => {
    return athletes.map((athlete, index) => (
      <AthleteItem key={"athlete" + index} athlete={athlete} />
    ));
  };

  return (
    <>
      {/*Oversrkift*/}
      <header className="mb-2">
        <h3 className="text-xl">Athletes</h3>
      </header>
      {/*Knappen for å hente athletes*/}
      <section className="mb-2">
        <button
          onClick={getAthletes}
          /*Denne kan endres på*/
          className="border border-fuchsia-700 px-2 py-1 text-white bg-fuchsia-600 hover:bg-fuchsia-500 cursor-pointer"
        >
          Show athletes
        </button>
      </section>
      {/*Grid som viser alle athlete komponenter*/}
      <section className="grid grid-cols-3 gap-4">{getAthletesJSX()}</section>
    </>
  );
};

export default AthleteList;
