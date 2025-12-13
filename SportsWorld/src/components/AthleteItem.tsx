import type { IAthlete } from "../interfaces/IAthlete";
import AthleteDelete from "./AthleteDelete";
import { CiEdit } from "react-icons/ci";

// Komponent som tar inn et athlete objekt.
const AthleteItem = ({
  athlete,
  onUpdate,
  onDelete,
  showActions = true,
}: {
  athlete: IAthlete;
  onUpdate?: (athlete: IAthlete) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}) => {
  return (
    <div className="">
      {/*Boks som viser informasjon om athlete, sammen med tailwind klasser*/}
      <article className="col-span-3 border-4 border-violet-300 border-y-violet-500 shadow-xl/30 bg-slate-900 p-4 drop-shadow-xl/50 hover:scale-105 hover:shadow-2xl transition-transform duration-500">
        {/*Navn og ID*/}
        <h3 className="text-center font-semibold">
          {athlete.name}
          (id: {athlete.id})
        </h3>

        {/*Bilde*/}
        <img
          className="rounded-full w-40 h-40 object-cover border-2 border-black"
          //Web apiets sin images mappe:
          src={`http://localhost:5105/images/${athlete.image}`}
          alt={`This is a image of ${athlete.name}`}
        />

        {/*Kjønn*/}
        <p className="text-start text-white">Gender: {athlete.gender}</p>

        {/*Pris*/}
        <p className="text-start text-white">
          Price: {(athlete.price ?? 0).toLocaleString() ?? "Unknown"}
        </p>

        {/*Kjøpsstatus*/}
        <p className="text-center text-white">
          Status: {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
        </p>

        {/*Actions (Update + Delete)*/}
        {showActions && (
          <>
            <div className="flex justify-end gap-4 mt-2 ">
              <button
                onClick={() => onUpdate?.(athlete)}
                className="px-3 py-1 !bg-green-600 text-white rounded hover:bg-blue-500"
              >
                <CiEdit />
              </button>
            </div>

            {/* Delete */}
            {athlete.id !== undefined && onDelete && (
              <AthleteDelete athlete={athlete} onDelete={onDelete} />
            )}
          </>
        )}
      </article>
    </div>
  );
};

export default AthleteItem;
