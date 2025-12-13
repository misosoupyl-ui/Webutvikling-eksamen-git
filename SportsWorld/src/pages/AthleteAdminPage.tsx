import AthleteList from "../components/AthleteList";

const AthleteAdminPage = () => {
  return (
    <section className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="flex justify-center text-shadow-lg/30 ">
        AthleteAdminPage
      </h1>
      <AthleteList />
    </section>
  );
};

export default AthleteAdminPage;
