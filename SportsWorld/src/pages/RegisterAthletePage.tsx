import RegisterAthleteForm from "../components/RegisterAthleteForm";

const RegisterAthletePage = () => {
    return (
        <section className="min-h-screen bg-slate-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-6 text-white p-6">Register Athlete</h1>
            <RegisterAthleteForm />
        </section>
    );
};

export default RegisterAthletePage;