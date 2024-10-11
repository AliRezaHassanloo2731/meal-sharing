import team from "@/app/public/team.png";
import managerteam from "@/app/public/managerTeam.png";
import Image from "next/image";

export const resvalidate = 24 * 3600;

export const metadata = {
  title: "Review",
};
export default async function Page() {
  const res = await fetch("http://localhost:3001/meals", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const mealsData = await res.json();

  if (!mealsData.length) return null;

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Meal Sharing
        </h1>

        <div className="space-y-8">
          <p>
            Don’t panic, hygge isn&apos;t going anywhere.
            But I’d like to pitch “fællesspisning” as the
            next Danish word to garner international
            attention. Directly translated, it means
            &quot;communal eating&quot;, but of course it is
            so much more than that.
          </p>
          <p>
            Take our {mealsData.length} foods scene, for
            example. Copenhagen has an incredible food
            scene, considering how small the city itself is,
            and one of the things that really makes it
            special is how people share and collaborate with
            each other. Restaurants here don’t compete to be
            the best and destroy the rest; instead, they
            often collaborate on projects together and help
            each other out with things.
          </p>
          <p>
            The easiest way to describe fællesspisning is to
            compare it to a family meal.
          </p>
        </div>
      </div>

      <div className="relative aspect-square col-span-2">
        <Image
          fill
          src={team}
          placeholder="blur"
          quality={80}
          className="object-cover"
          sizes="(max-width: 768px)"
          alt="Group photo members of team "
        />
      </div>

      <div className="col-span-2">
        <Image
          src={managerteam}
          placeholder="blur"
          quality={80}
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our group of people who developed this
          website
        </h1>

        <div className="space-y-8">
          <p>
            All are welcome—students, the elderly, toddlers
            playing board games, the builders working around
            the corner, the group of dressed-up women
            who&apos;ve brought along their own bottle of
            champagne. Non-Danish speakers, too!
          </p>
          <p>
            Remember being a kid and coming home for dinner
            in the evening? Everyone would eat at the same
            time, you’d eat the same thing, and you’d
            probably have to help by bringing it to the
            table or doing the dishes afterward. Imagine
            that, just on a greater scale, with your friends
            and/or people you’ve never met before.
          </p>

          <div>
            <a
              href="/MealsList"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore recent meals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
