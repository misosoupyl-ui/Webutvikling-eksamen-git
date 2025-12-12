import { useState } from "react";
import AthleteService from "../services/AthleteService";
import ImageUploadService from "../services/ImageUpLoadService";
import type { IAthlete } from "../interfaces/IAthlete";

const RegisterAthleteForm = ({
  onAthleteCreated,
}: {
  onAthleteCreated: (athlete: IAthlete) => void;
}) => {
  // Skjemaverdier
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Statusmelding
  const [statusMessage, setStatusMessage] = useState("");

  // Når bruker trykker på Save
  const handleSubmit = async () => {
    // Validering
    if (!name || !gender || !price) {
      setStatusMessage("You must fill out all fields.");
      return;
    }

    let uploadedFileName = "";

    // Laster opp fil hvis bruker valgte et bilde
    if (imageFile) {
      const uploaded = await ImageUploadService.uploadImage(imageFile);
      if (!uploaded) {
        setStatusMessage("Image upload failed.");
        return;
      }
      uploadedFileName = uploaded;
    }

    // Lager athlete-objekt
    const newAthlete: IAthlete = {
      name,
      gender,
      price: Number(price),
      image: uploadedFileName,
      purchaseStatus: false,
    };

    // Sender til API
    const response = await AthleteService.postAthletes(newAthlete);

    if (response) {
      setStatusMessage(`${response.name} has been registered!`);

      // Kaller callback → viktig!
      onAthleteCreated(response);

      // Nullstiller form
      setName("");
      setGender("");
      setPrice("");
      setImageFile(null);
    } else {
      setStatusMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <label>
        <span>Name</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        <span>Gender</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </label>

      <label>
        <span>Price</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label>
        <span>Image File</span>
        <input
          className="border rounded px-2 py-1"
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <button
        className="px-4 py-2 bg-slate-200 text-black rounded hover:bg-slate-300"
        onClick={handleSubmit}
      >
        Save
      </button>

      <p>Status: {statusMessage}</p>
    </div>
  );
};

export default RegisterAthleteForm;
