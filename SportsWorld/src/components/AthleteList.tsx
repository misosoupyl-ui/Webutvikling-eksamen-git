import { useState, type ReactNode } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import AthleteItem from "./AthleteItem";
import AthleteEdit from "./AthleteEdit";

const AthleteList = () => {
  // State for å lagre listen av athletes
  // DENNE MÅ FORKLARES BEDRE!!!!!!
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<IAthlete | null>(null);

  const handleSelectedAthlete = (athletes: IAthlete) => {
    setSelectedAthlete(athletes);
  };

  const getAthletes = async () => {
    try {
      const data = await AthleteService.getAllAthletes();
      setAthletes(data);
    } catch (error) {
      console.error("Respons feil", error);
    }
  };

  return (
    <>
      {/*Oversrkift*/}
      <header className="mb-2">
        <h3 className="text-xl">Athletes</h3>
      </header>

      {/**/}
      {selectedAthlete && (
        <AthleteEdit
          athlete={selectedAthlete}
          onSave={(updatedAthlete: IAthlete) => {
            //oppdaterer listen med redigert athlete
            setAthletes((prev) =>
              prev.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a))
            );
            setSelectedAthlete(null);
          }}
        />
      )}

      {/*Knappen for å hente athletes*/}
      <section className="mb-2">
        <button
          onClick={getAthletes}
          /*Denne kan endres på*/
          className="border border-fuchsia-700 px-2 py-1 text-white bg-fuchsia-600 hover:bg-fuchsia-500 cursor-pointer"
        >
          Show all athletes
        </button>
      </section>
      {/*Grid som viser alle athlete komponenter. 
      https://v1.scrimba.com/articles/react-list-array-with-map-function/*/}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {athletes.map((athlete, index) => (
          <AthleteItem
            key={athlete.id}
            athlete={athlete}
            onUpdate={handleSelectedAthlete}
          />
        ))}
      </section>
    </>
  );
};

export default AthleteList;
