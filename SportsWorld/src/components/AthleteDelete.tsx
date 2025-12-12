import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { useState, type ReactNode } from "react";

const AthleteDelete = ({
  athlete,
  onDelete,
}: {
  athlete: IAthlete;
  onDelete: (id: number) => void;
}) => {
  const [statusMessage, setStatusMessage] = useState("");

  const deleteAthlete = async (id: number) => {
    try {
      await AthleteService.deleteAthletes(id); //sender til backend
      onDelete(id);
      setStatusMessage("Athlete deleted successfully");
    } catch (error) {
      setStatusMessage("Error: Deleting went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <button
        className="px-2 py-1 bg-green-600 text-white rounded hover:bg-blue-500"
        onClick={() => deleteAthlete(athlete.id!)}
      >
        Delete
      </button>
      {statusMessage && <p className="text-green-600">{statusMessage}</p>}
    </div>
  );
};

export default AthleteDelete;
