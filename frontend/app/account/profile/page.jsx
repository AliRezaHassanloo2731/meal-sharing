import UpdateProfile from "@/app/components/UpdateProfile";
import { getGuest } from "@/app/lib/data-service";
import { auth } from "@/app/lib/auth";

export const metadata = {
  title: "Update Guest Profile",
};

export default async function Page() {
  const session = await auth();
  if (!session.user) {
    return (
      <div>
        You must be logged in to update your profile.
      </div>
    );
  }

  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>
      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your
        check-in process faster and smoother. See you soon!
      </p>
      <UpdateProfile guest={guest}></UpdateProfile>
    </div>
  );
}
