// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔹 Dummy user database (Replace with DB later)
        const users = [
          { id: "1", name: "John Doe", email: "john@example.com", password: "123456" },
        ];

        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );

        if (!user) return null; // Authentication failed
        return { id: user.id, name: user.name, email: user.email }; // Authentication success
      },
    }),
  ],

  pages: {
    signIn: "/auth/login", // Redirect to your login page
  },

  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET, // Set in .env
});

export { handler as GET, handler as POST };
