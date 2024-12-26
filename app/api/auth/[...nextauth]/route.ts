import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { compare } from "bcrypt"

const handler =  NextAuth({
  adapter: PrismaAdapter(prisma.prisma ? prisma.prisma : prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        let user
        try {
            const _prisma = (prisma.prisma ? prisma.prisma : prisma)
            user = await _prisma.user.findUnique({
            where: { username: credentials.username }
            })
        } catch(e) {
            console.error(e)
            return null
        }

        if (!user) {
          return null
        }

        // const isPasswordValid = await compare(credentials.password, user.password)
        const isPasswordValid = credentials.password === user.password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          username: user.username,
          role: user.position,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    }
  }
})



export { handler as GET, handler as POST } 