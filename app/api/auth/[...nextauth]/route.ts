import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your own logic here to look up the user from the credentials supplied
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: 1, name: "Admin" }
        } else {
          return null
        }
      },
    }),
  ],
  // Add your own secret here
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

