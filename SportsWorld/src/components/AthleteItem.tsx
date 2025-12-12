import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { useState } from "react";
import AthleteDelete from "./AthleteDelete";
//Komponent som tar inn et athlete objekt.
const AthleteItem = ({
  athlete,
  onUpdate,
  onDelete,
}: {
  athlete: IAthlete;
  onUpdate: (athlete: IAthlete) => void;
  onDelete: (id: number) => void;
}) => {
  const [statusMessage, setStatusMessage] = useState("");

  return (
    <div className="">
      {/*Boks som viser informasjon om athlete, sammen med tailwind klasser*/}
      <article className="col-span-3 border-4 border-violet-300 border-y-violet-500 shadow-xl/30 p-4 ">
        {/*Navn og ID*/}
        <h3 className="text-center font-semibold">
          {athlete.name}
          (id: {athlete.id})
        </h3>
        {/*Bilde*/}
        <img
          className="rounded-full w-40 h-40  object-cover border-4"
          //Web apiets sin images mappe:
          src={`http://localhost:5105/images/${athlete.image}`}
          alt={`This is a image of ${athlete.name}`}
        />
        {/*Kjønn*/}
        <p className="text-center text-white">Gender: {athlete.gender}</p>
        {/*Pris. (Universiell utforming) Bruker toLocateString slik at store tall blir lettere å lese, vises med tusenskiller tilpasset brukerens språk.https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString */}
        <p className="text-center text-white">
          Price: {(athlete.price ?? 0).toLocaleString() ?? "Unknown"}
        </p>
        {/*Kjøpsstatus*/}
        <p className="text-center text-white">
          Status: {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
        </p>
        {/*Oppdarerings knapp*/}
        <div className="flex justify-center mt-2">
          <button
            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-blue-500"
            onClick={() => onUpdate(athlete)}
          >
            {" "}
            Update
          </button>
        </div>
        <AthleteDelete athlete={athlete} onDelete={onDelete} />
      </article>
    </div>
  );
};

export default AthleteItem;
