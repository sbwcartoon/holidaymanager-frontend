import {getCountries} from "@/lib/api";
import {CountryCard} from "@/components/CountryCard";

export default function Home() {
  const countries = getCountries();

  return (
    <>
      <h1 className="text-2xl font-bold py-5">Select a country 🥰</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryCard {...country} key={country.countryCode}/>
        ))}
      </div>
    </>
  );
}
