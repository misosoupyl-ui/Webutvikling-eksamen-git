import { useState } from "react";
import RegisterAthleteForm from "../components/RegisterAthleteForm";
import AthleteItem from "../components/AthleteItem";
import type { IAthlete } from "../interfaces/IAthlete";


const RegisterAthletePage = () => {
  // Liste over newly created athletes
  const [createdAthletes, setCreatedAthletes] = useState<IAthlete[]>([]);

  // Callback som blir kalt fra RegisterAthleteForm
  const handleAthleteCreated = (athlete: IAthlete) => {
    // Legger til den nye i listen
    setCreatedAthletes((prev) => [...prev, athlete]);
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Register Athlete</h1>

      {/* Sender callback til formen */}
      <RegisterAthleteForm onAthleteCreated={handleAthleteCreated} />

      {/* Viser kun athletes som er registrert via Page 2 */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Newly Registered Athletes</h2>

      <div className="grid grid-cols-4 gap-6">
        {createdAthletes.map((athlete) => (
          <AthleteItem key={athlete.id} athlete={athlete} onUpdate={() => {}} />
        ))}
      </div>
    </section>
  );
};

export default RegisterAthletePage;
