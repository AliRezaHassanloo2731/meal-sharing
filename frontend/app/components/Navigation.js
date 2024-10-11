import Link from "next/link";
import { auth } from "@/app/lib/auth";

export async function Navigation() {
  const session = await auth();
  console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/"
            className="hover:text-accent-400 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/MealsList"
            className="hover:text-accent-400 transition-colors"
          >
            Meals
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Reservation
          </Link>
        </li>
        <li>
          <Link
            href="/Review"
            className="hover:text-accent-400 transition-colors"
          >
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
