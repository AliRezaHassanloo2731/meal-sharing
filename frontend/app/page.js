import Image from "next/image";
import "./styles/globals.css";
import bg from "@/app/public/Florence.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top"
        alt="fast food doesn’t have to come from a drive thru"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          We’ve made it!
        </h1>
        <Link
          href="/MealsList"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore recent meals
        </Link>
      </div>
    </main>
  );
}
