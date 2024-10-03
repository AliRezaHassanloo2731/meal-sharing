import "@/app/styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Meal Sharing",
    default: "Welcome / Meal Sharing",
  },
  description:
    "Meal Sharing platform for sharing meals with friends. Located in the heart of copenhagen and provides a variety of services for sharing your meal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-900 text-primary-100 
        min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
