import NextAuth from "next-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
    // @ts-ignore <-- according to https://github.com/nextauthjs/next-auth/issues/2701
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
      // @ts-ignore <-- according to https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        return await signInWithEmailAndPassword(
          auth,
          credentials ? credentials.email : "",
          credentials ? credentials.password : ""
        )
          .then((res) => {
            if (res.user) {
              return res.user;
            }
            return null;
          })
          .catch((error) => {
            throw error;
          });
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
