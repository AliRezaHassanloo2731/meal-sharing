import MealCard from "./MealCard";

export const revalidate = 24 * 3600;

export default function MealList({ meals }) {
  if (!meals || meals.length === 0) {
    return <p>No meals found.</p>;
  }

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12
     xl:gap-14"
    >
      {meals.map((meal) => (
        <MealCard meal={meal} key={meal.id} />
      ))}
    </div>
  );
}
