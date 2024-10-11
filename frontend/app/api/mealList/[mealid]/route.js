import { getMeals } from "@/app/lib/data-service";

export async function GET(request, { params }) {
  const { mealid } = params;

  try {
    const [meal] = await Promise.all([getMeals(mealid)]);

    return Response.json({ meal });
  } catch {
    return Response.json({ message: "meal not found" });
  }
}
