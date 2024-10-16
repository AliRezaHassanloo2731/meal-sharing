"use server";

import axios from "axios";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
}

export async function deleteReservation(reservationId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  try {
    const response = await axios.delete(
      `/api/reservations/${reservationId}`
    );

    if (response.status !== 200) {
      throw new Error("Reservation could not be deleted");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
