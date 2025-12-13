import { useRef, useState, useEffect } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";

//AthleteEdit komponent som lar bruker endre informasjon om athlete.
// athlete= objektet som skal vises og redigeres
// onSave= funksjon som kalles når oppdateringen er lagret.
const AthleteEdit = ({
  athlete,
  onSave,
}: {
  athlete: IAthlete;
  onSave: (updatedAthlete: IAthlete) => void;
}) => {
  //  Lese verdiene fra inout feltet.
  const idInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const purchaseStatusRef = useRef<HTMLSelectElement>(null);

  // State for å vise status melding til brukeren
  const [statusMessage, setStatusMessage] = useState<string>("");

  //
  useEffect(() => {
    if (idInput.current && athlete.id !== undefined) {
      idInput.current.value = athlete.id.toString();
    }
    // Fyller navn, pris og kjøpstatus
    if (nameInput.current) nameInput.current.value = athlete.name;
    if (priceInput.current)
      priceInput.current.value = (athlete.price ?? 0).toString();
    if (purchaseStatusRef.current)
      purchaseStatusRef.current.value = (
        athlete.purchaseStatus ?? false
      ).toString();
  }, [athlete]);

  const editAthlete = async () => {
    if (
      idInput.current &&
      nameInput.current &&
      priceInput.current &&
      purchaseStatusRef.current &&
      idInput.current.value.trim() !== "" &&
      nameInput.current.value.trim() !== "" &&
      priceInput.current.value.trim() !== ""
    ) {
      const id = Number(idInput.current.value);
      const name = nameInput.current.value;
      const price = Number(priceInput.current.value);
      const purchaseValue = purchaseStatusRef.current.value === "true";

      if (!isNaN(id) && !isNaN(price)) {
        //Lager et nytt athlete objekt.
        const editedAthlete: IAthlete = {
          id,
          name,
          price,
          purchaseStatus: purchaseValue,
          image: athlete.image,
          gender: athlete.gender,
        };
        //Sender det til backend delen via athlete service, oppdaterer UI, og
        try {
          await AthleteService.putAthletes(editedAthlete);

          onSave(editedAthlete);
          setStatusMessage("Athlete updated");
        } catch (error) {
          setStatusMessage("Something went wrong with updating");
        }
      } else {
        setStatusMessage("ID and Price must be numbers");
      }
    } else {
      setStatusMessage("Input needs to be filled");
    }
  };

  return (
    <section className="bg-slate-800 shadow-lg  mt-6">
      <h3>Update Athlete</h3>
      <div className="flex items-center gap-2 mt-3">
        <label>Id</label>
        <input
          ref={idInput}
          className="border rounded"
          type="number"
          readOnly
        />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <label>Name</label>
        <input ref={nameInput} className="border rounded " type="text" />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <label>Price</label>
        <input ref={priceInput} className="border rounded" type="number" />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <label>Kjøpsstatus</label>
        <select ref={purchaseStatusRef} className="border rounded">
          <option value="true">Purchased</option>
          <option value="false"> Not Purchased</option>
        </select>
      </div>
      <button onClick={editAthlete} className="!bg-purple-900/50 border mt-6">
        Save changes
      </button>
      {statusMessage && <p className="text-green-600"> {statusMessage}</p>}
    </section>
  );
};

export default AthleteEdit;
