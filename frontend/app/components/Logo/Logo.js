import Link from "next/link";
import Image from "next/image";
import logo from "@/app/public/meal.jpg";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        quality={100}
        height="60"
        width="60"
        alt="meal sharing"
      />
      <span className={`${dancing.className} text-3xl`}>
        MEAL - SHARING
      </span>
    </Link>
  );
}

export default Logo;
