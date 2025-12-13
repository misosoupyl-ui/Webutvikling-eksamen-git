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
    <div className="flex justify-end gap-4 mt-2 ">
      <button onClick={() => deleteAthlete(athlete.id!)}>Delete</button>
      {statusMessage && <p className="text-green-600">{statusMessage}</p>}
    </div>
  );
};

export default AthleteDelete;
