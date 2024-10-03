import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

// PLACEHOLDER DATA
// const cabin = {
//   id: 47,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

const meal = {
  id: 47,
  title: "Italian Feast",
  description: "A delicious spread of Italian cuisine",
  location: "123 Pasta Lane, New York, NY",
  when: "2024-08-01T16:00:00.000Z",
  max_reservations: 20,
  price: "25.00",
  created_date: "2024-06-30T22:00:00.000Z",
  image_url:
    "https://images.unsplash.com/photo-1544378730-8b5104b18790?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SXRhbGlhbiUyMEZlYXN0fGVufDB8fDB8fHww",
};

export default function Page() {
  // const {
  //   id,
  //   name,
  //   maxCapacity,
  //   regularPrice,
  //   discount,
  //   image,
  //   description,
  // } = cabin;
  const {
    id,
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
    image_url,
  } = meal;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <img src={image_url} alt={`Meal ${title}`} />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {title}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            {description}
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to
                <span className="font-bold">
                  {max_reservations}
                </span>
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the
                <span className="font-bold">Dolomites</span>
                {/* (Italy) */}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy
                <span className="font-bold">100%</span>
                guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
