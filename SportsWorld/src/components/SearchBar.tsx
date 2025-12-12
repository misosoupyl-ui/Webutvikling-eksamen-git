import { useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";

// Hva brukern skiver inn (string)

// Resultat på det brukeren skriver inn, filtrert for display

// Trenger et sted for å store user input, og også store hva som matcher det inputet

const SearchBar = () => {
  //Oppretter en state variabel for å huske det brukeren skriver i søkefeltet
  //og oppdateres hver gang input endres
  const [searchId, setSearchId] = useState("");
  // En state for å vise status meldinger til brukeren
  const [statusMessage, setStatusMessage] = useState("");
  // Oppretter en state for å lagre resultatet av søket, enten athlete som ble funnet eller null hvis ingen
  const [foundAthlete, setFoundAthlete] = useState<IAthlete | null>(null);

  //Funksjonen for å håndtere søket

  const filterSearch = async () => {
    const id = Number(searchId); // konverterer input til number
    if (!isNaN(id)) {
      // Hvis ID er gyldig søk i backend
      const athlete = await AthleteService.getAthletesById(id);

      if (athlete) {
        setFoundAthlete(athlete); // Oppdaterer resultatet
        setStatusMessage(`Found Athlete Id: ! ${athlete.id}`);
      } else {
        setFoundAthlete(null);
        setStatusMessage("Did not find athlete");
      }
    } else {
      setFoundAthlete(null);
      setStatusMessage("Id must be a number");
    }
  };

  return (
    <section>
      <div className=" max-w-md mx-aut shadow-xl/30 p-4">
        <input
          className="border-2 border-white px-2 h-11"
          type="text"
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          placeholder="Enter athlete ID"
        />
        <button onClick={filterSearch}>Search</button>

        {statusMessage}

        {foundAthlete && (
          <div className="col-span-3 border-4 border-violet-300 border-y-violet-500 shadow-xl/30 p-4 ">
            <h3 className="text-center font-semibold">
              {foundAthlete.name} (id:{foundAthlete.id})
            </h3>

            <img
              className="rounded-full w-40 h-40  object-cover border-4"
              src={`http://localhost:5105/images/${foundAthlete.image}`}
              alt={`This is a image of${foundAthlete.name}`}
            />
            <p className="text-center text-white">
              Gender: {foundAthlete.gender}
            </p>
            <p className="text-center text-white">
              Price: {(foundAthlete.price ?? 0).toLocaleString() ?? ""}
            </p>
            <p className="text-center text-white">
              Status:{" "}
              {foundAthlete.purchaseStatus ? "Purchased" : "Not purchased"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
