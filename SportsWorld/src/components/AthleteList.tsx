import { useState, type ReactNode } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import AthleteItem from "./AthleteItem";
import AthleteEdit from "./AthleteEdit";
import AthleteDelete from "./AthleteDelete";
import SearchBar from "./SearchBar";

const AthleteList = () => {
  // State for å lagre listen av athletes
  // DENNE MÅ FORKLARES BEDRE!!!!!!
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<IAthlete | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

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

      {/*Search bar*/}
      <section className="mb-4">
        <SearchBar></SearchBar>
      </section>

      {/**/}
      {selectedAthlete && (
        <AthleteEdit
          athlete={selectedAthlete}
          onSave={(updatedAthlete: IAthlete) => {
            //oppdaterer listen med redigert athlete
            setAthletes((prevstate) =>
              prevstate.map((a) =>
                a.id === updatedAthlete.id ? updatedAthlete : a
              )
            );
            setSelectedAthlete(null);
            setStatusMessage("Athlete update succsessful");
          }}
        />
      )}

      {/*Knappen for å hente athletes*/}
      <section className="mb-2">
        <button
          onClick={getAthletes}
          /*Denne kan endres på*/
          className="!bg-purple-900/50 border mt-6"
        >
          Show all athletes
        </button>
      </section>

      {/*Melding som sier at det gikk bra å oppdatere*/}
      {statusMessage && <p className="text-green-600">{statusMessage} </p>}

      {/*Grid som viser alle athlete komponenter. 
      https://v1.scrimba.com/articles/react-list-array-with-map-function/*/}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {athletes.map((athlete, index) => (
          <AthleteItem
            key={athlete.id}
            athlete={athlete}
            onUpdate={handleSelectedAthlete}
            onDelete={(id: number) =>
              setAthletes((prevstate) =>
                prevstate.filter((athlete) => athlete.id !== id)
              )
            }
          />
        ))}
      </section>
    </>
  );
};

export default AthleteList;
