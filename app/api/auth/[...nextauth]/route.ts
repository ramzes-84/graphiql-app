import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
      // @ts-ignore <-- this is like an official solution for a problem with types, as next-auth is being developed with strict: false, ugh. Reference: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
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
