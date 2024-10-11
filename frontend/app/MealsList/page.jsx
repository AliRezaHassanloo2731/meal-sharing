import { Suspense } from "react";
import Loading from "./loading";
import FilteredMeals from "../components/FilteredMeals";

export const revalidate = 24 * 3600;

export const metadata = {
  title: "Meals List",
};

export default async function Page({ searchParams }) {
  const res = await fetch("http://localhost:3001/meals", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const mealsData = await res.json();
  if (!mealsData.length) return null;

  const filter = searchParams?.price ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Healthy Meals
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        The fabric of Cutlets was born out of love and
        respect for these humble deli creations, met with a
        desire to bring quality ingredients to the table.
        Simply put, we’re here to bring you a traditional
        recipe for creating your own experience. you can
        feel good about.
      </p>

      <Suspense fallback={<Loading />} key={filter}>
        <FilteredMeals
          mealsData={mealsData}
          filter={filter}
        />
      </Suspense>
    </div>
  );
}
