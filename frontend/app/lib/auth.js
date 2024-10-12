import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
// import { pages } from "next/dist/build/templates/app-page";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, req }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            contact_email: user.email,
            contact_name: user.name,
          });

        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest.id;
      } else {
        session.user.guestId = null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
