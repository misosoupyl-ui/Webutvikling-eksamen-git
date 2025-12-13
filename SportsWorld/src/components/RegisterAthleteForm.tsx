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
    <div className="flex flex-col items-start gap-6  rounded-xl shadow-lg max-w-sm max-w-md mt-10 p-10 border border-slate-500 bg-slate-700/50">
      <label className="flex flex-col w-full">
        <span className="font-medium p-2">Name</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          placeholder="Enter athlete's name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label className="flex flex-col w-full">
        <span className="font-medium p-2">Gender</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          placeholder="Enter athlete's gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </label>

      <label className="flex flex-col w-full">
        <span className="font-medium p-2">Price</span>
        <input
          className="border rounded px-2 py-1"
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>

      <label className="flex flex-col w-full">
        <span>Image File</span>
        <input
          className="border rounded px-2 py-1"
          type="file"
          onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
        />
      </label>

      <button
        className="px-4 py-2 !bg-green-900/50 text-white
         rounded hover:bg-slate-300"
        onClick={handleSubmit}
      >
        Save
      </button>

      <p className="font-semibold mt-2">Status: {statusMessage}</p>
    </div>
  );
};

export default RegisterAthleteForm;
