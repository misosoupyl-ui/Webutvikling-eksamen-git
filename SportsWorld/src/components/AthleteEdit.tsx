import { useRef, useState, useEffect } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";

const AthleteEdit = ({
  athlete,
  onSave,
}: {
  athlete: IAthlete;
  onSave: (updatedAthlete: IAthlete) => void;
}) => {
  const idInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const purchaseStatusRef = useRef<HTMLSelectElement>(null);

  // State for å vise status melding til brukeren
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (idInput.current && athlete.id !== undefined) {
      idInput.current.value = athlete.id.toString();
    }

    if (nameInput.current) nameInput.current.value = athlete.name;
    if (priceInput.current) priceInput.current.value = athlete.price.toString();
    if (purchaseStatusRef.current)
      purchaseStatusRef.current.value = athlete.purchaseStatus.toString();
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
        const editedAthlete: IAthlete = {
          id,
          name,
          price,
          purchaseStatus: purchaseValue,
          image: athlete.image,
          gender: athlete.gender,
        };

        const response = await AthleteService.putAthletes(editedAthlete);
        if (response) {
          onSave(editedAthlete);
          setStatusMessage("Athlete updated");
        } else {
          setStatusMessage("Something went wrong with updating");
        }
      } else {
        setStatusMessage("ID and Price must be numbers");
      }
    } else {
      setStatusMessage("All input needs to be filled");
    }
  };

  return (
    <section>
      <h3>Update Athlete</h3>
      <div>
        <label>Id</label>
        <input ref={idInput} className="border" type="number" readOnly />
      </div>

      <div>
        <label>Name</label>
        <input ref={nameInput} className="border" type="text" />
      </div>
      <div>
        <label>Price</label>
        <input ref={priceInput} className="border" type="number" />
      </div>
      <div>
        <label>Kjøpsstatus</label>
        <select ref={purchaseStatusRef} className="border">
          <option value="true">Purchased</option>
          <option value="false"> Not Purchased</option>
        </select>
      </div>
      <button onClick={editAthlete} className="border">
        Save changes
      </button>
      {statusMessage && <p className="text-green-600"> {statusMessage}</p>}
    </section>
  );
};

export default AthleteEdit;
