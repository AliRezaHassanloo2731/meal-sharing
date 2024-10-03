import supabase from "./supabase";
export async function getMeals() {
  const { data, error } = await supabase
    .from("meal")
    .select("*");

  if (error) {
    throw new error();
  }
  return data;
}
