import { format, isPast } from "date-fns"; // Import date formatting library if needed
import DeleteReservation from "./DeleteReservation";
import Link from "next/link";

function ReservationCard({ reservation }) {
  const {
    id,
    number_of_guests,
    created_date,
    contact_name,
    contact_phonenumber,
    contact_email,
    meal_id,
  } = reservation;

  return (
    <div className="flex border border-primary-800">
      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Reservation for {contact_name} (ID: {id})
          </h3>
        </div>

        <p className="text-lg text-primary-300">
          <strong>Meal ID:</strong> {meal_id}
        </p>
        <p className="text-lg text-primary-300">
          <strong>Number of Guests:</strong>
          {number_of_guests}
        </p>
        <p className="text-lg text-primary-300">
          <strong>Contact Phone:</strong>
          {contact_phonenumber}
        </p>
        <p className="text-lg text-primary-300">
          <strong>Contact Email:</strong> {contact_email}
        </p>
        <p className="text-lg text-primary-300">
          <strong>Created Date:</strong>
          {format(
            new Date(created_date),
            "EEE, MMM dd yyyy"
          )}
        </p>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(created_date) ? (
          <>
            <Link
              href={`/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <span className="mt-1">Edit</span>
            </Link>

            <DeleteReservation reservationId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
