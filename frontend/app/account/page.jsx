import { auth } from "@/app/lib/auth";

export const metadata = {
  title: "Guest area",
};
export default async function Page() {
  const session = await auth();
  if (!session.user) {
    return <h2>You are not logged in.</h2>;
  }
  // const firstName = "Reza";
  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome,{firstName}
      </h2>
    </div>
  );
}
