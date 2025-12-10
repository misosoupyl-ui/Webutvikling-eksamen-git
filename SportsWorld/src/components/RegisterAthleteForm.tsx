import { useState } from "react";
import AthleteService from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";
import ImageUpLoadService from "../services/ImageUpLoadService";

const RegisterAthleteForm = () => {
  // Skjemaverdier
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  // Her lagrer vi valgt bildefil (fra <input type="file">)
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Statusmelding til bruker
  const [statusMessage, setStatusMessage] = useState<string>("");

  const postNewAthlete = async () => {
    // Enkel validering – sjekker at viktige felt er fylt ut
    if (!name || !gender || !price) {
      setStatusMessage("Du må fylle ut navn, kjønn og pris.");
      return;
    }

    // Konverterer pris fra tekst (input) til number
    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setStatusMessage("Pris må være et positivt tall.");
      return;
    }

    // Sjekker at bruker har valgt et bilde
    if (!imageFile) {
      setStatusMessage("Du må velge et bilde.");
      return;
    }

    // 1: Last opp bilde via ImageUpLoadService
    const fileName = await ImageUpLoadService.uploadImage(imageFile);

    if (!fileName) {
      setStatusMessage("Noe gikk galt ved bildeopplasting.");
      return;
    }

    // 2: Lager nytt athlete-objekt som sendes til AthleteService (og videre til API-et)
    const newAthlete: IAthlete = {
      name: name,
      gender: gender,
      price: priceNumber,
      image: fileName, // Viktig: bruker filnavnet som backend genererte
      // Når vi registrerer en ny athlete skal den være "not purchased" som default
      purchaseStatus: false,
    };

    // 3: Venter (await) på at AthleteService blir ferdig med å poste nytt athlete
    const response = await AthleteService.postAthletes(newAthlete);

    // Sjekker om AthleteService returnerte noe (true = alt gikk bra, null = feil)
    if (response) {
      setStatusMessage(`${response.name} is registered!`);

      // Tømmer feltene etter vellykket registrering
      setName("");
      setGender("");
      setPrice("");
      setImageFile(null);
    } else {
      setStatusMessage(
        "Something went wrong while registering, try again."
      );
    }

    // Nullstill statusmelding etter 3 sekunder
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Register a new Athlete</h3>

      <div className="flex flex-col gap-3 max-w-sm">
        {/* Navn */}
        <label className="flex flex-col text-sm">
          <span>Name</span>
          <input
            className="border rounded px-2 py-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Kjønn */}
        <label className="flex flex-col text-sm">
          <span>Gender</span>
          <input
            className="border rounded px-2 py-1"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>

        {/* Pris */}
        <label className="flex flex-col text-sm">
          <span>Price</span>
          <input
            className="border rounded px-2 py-1"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        {/* Bilde-fil */}
        <label className="flex flex-col text-sm">
          <span>Image</span>
          <input
            className="border rounded px-2 py-1"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setImageFile(file);
            }}
          />
        </label>

        <button
          type="button"
          onClick={postNewAthlete}
          className="mt-2 px-4 py-2 rounded border bg-slate-100 text-slate-900 hover:bg-slate-200"
        >
          Save
        </button>

        <p className="mt-2 text-sm">Status: {statusMessage}</p>
      </div>
    </section>
  );
};

export default RegisterAthleteForm;
