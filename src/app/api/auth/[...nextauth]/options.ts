import { prisma } from "@/lib/prisma";
import { AuthenticationError } from "@/utils/error";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { unstable_noStore } from "next/cache";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        // Check if email is verified and ends with @gmail.com
        if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
          // Check if the user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          // If the user does not exist, create a new user
          if (!existingUser) {
            await prisma.user.create({
              data: {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              },
            });
          }

          return true;
        } else {
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

export async function getUserSession() {
  unstable_noStore();
  const session = await getServerSession(options);
  return session;
}

export async function checkPermission() {
  const session = await getUserSession();
  if (!session) throw new AuthenticationError();
  return session;
}
