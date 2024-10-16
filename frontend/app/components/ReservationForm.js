"use client";

import axios from "axios";
import { useState } from "react";

function ReservationForm({ meal }) {
  const [numGuests, setNumGuests] = useState(1);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] =
    useState("");

  const newReservation = {
    number_of_guests: numGuests,
    meal_id: meal.id,
    contact_phonenumber: contactPhoneNumber,
    contact_name: contactName,
    contact_email: contactEmail,
  };

  async function AddReservation(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/reservations",
        newReservation
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setNumGuests(1);
    setContactName("");
    setContactEmail("");
    setContactPhoneNumber("");
  }

  const maxCapacity = meal.max_reservations;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
      </div>

      <form
        onSubmit={AddReservation}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from(
              { length: maxCapacity },
              (_, i) => i + 1
            ).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <input
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <input
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="phonenumber"
            value={contactPhoneNumber}
            onChange={(e) =>
              setContactPhoneNumber(e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <input
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="email"
            value={contactEmail}
            onChange={(e) =>
              setContactEmail(e.target.value)
            }
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">
            All reservations are available for today
          </p>

          <button
            type="submit"
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
