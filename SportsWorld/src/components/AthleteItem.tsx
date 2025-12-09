import type { IAthlete } from "../interfaces/IAthlete";

//Komponent som tar inn et athlete objekt.
const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
  return (
    //Boks som viser informasjon om athlete, sammen med tailwind klasser
    <article className="col-span-3 border">
      {/*Navn og ID*/}
      <h3 className="text-center font-semibold">
        {athlete.name}
        (id: {athlete.id})
      </h3>
      {/*Bilde*/}
      <img
        className="rounded-full w-40 h-40  object-cover border-4 border--500"
        //Web apiets sin images mappe:
        src={`http://localhost:5105/images/${athlete.image}`}
        alt={`This is a image of ${athlete.name}`}
      />
      {/*Kjønn*/}
      <p className="text-center text-black">Gender: {athlete.gender}</p>
      {/*Pris. (Universiell utforming) Bruker toLocateString slik at store tall blir lettere å lese, vises med tusenskiller tilpasset brukerens språk.https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString */}
      <p className="text-center text-black">
        Price: {athlete.price.toLocaleString()}
      </p>
      {/*Kjøpsstatus*/}
      <p className="text-center text-black">
        Status: {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
      </p>
    </article>
  );
};

export default AthleteItem;
