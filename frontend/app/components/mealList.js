import MealCard from "./MealCard";

async function MealList() {
  const res = await fetch("http://localhost:3001/meals", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const mealsData = await res.json();

  if (!mealsData.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {mealsData.map((meal) => (
        <MealCard meal={meal} key={meal.id} />
      ))}
    </div>
  );
}
export default MealList;
