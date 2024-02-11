import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";

const handler = NextAuth({

  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, token }) {
        if(token){
            session.user.email = token.email
            session.user.image = token.picture
            session.user.name = token.name
            session.user.role = token.role
            session.user.barangayId = token.barangayId
        }
      return session
    },
    jwt({user, token}){
        if(user){
           token = {...user}
        }
        return token
    }
  },
  session: {    
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({   
      name: "Credentials",
    
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      
        
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const passwordsMatched = compareSync(
          credentials.password,
          user.password
        );
        if (!passwordsMatched) {
          return null;
        }
        console.log(user)
        return  user;

      },
    }),
  ],
  // pages: {
  //   signIn: '/admin', // specify the page to redirect to after sign-in
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
export { handler as GET, handler as POST };
