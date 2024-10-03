import MealList from "@/app/components/mealList";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Meals List",
};

export default function Page() {
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

      <Suspense fallback={<Loading />}>
        <MealList />
      </Suspense>
    </div>
  );
}
