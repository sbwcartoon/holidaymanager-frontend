import {getCountries} from "@/lib/api";
import {CountryCard} from "@/components/CountryCard";
import {Country} from "@/lib/types/Country";

export default async function Home() {
  const countries = await getCountries();

  return (
    <>
      <h1 className="text-2xl font-bold py-5">Select a country 🥰</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country: Country) => (
          <CountryCard {...country} key={country.countryCode}/>
        ))}
      </div>
    </>
  );
}
