import ReservationCard from "@/app/components/ReservationCard";
import { auth } from "@/app/lib/auth";
import { getReservation } from "@/app/lib/data-service";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div>
        <p>
          You must be logged in to view your reservations.
        </p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const reservations = await getReservation(
    session.user.guestId
  );
  // session.user.guestId

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {reservations.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our
          <a
            className="underline text-accent-500"
            href="/cabins"
          >
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {reservations.map((reservation) => (
            <ReservationCard
              reservation={reservation}
              key={reservation.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
