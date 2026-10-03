import { NextAuthConfig } from "next-auth";


export const authConfig = {
    secret: process.env.BETTER_AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    callbacks: {
        authorized({ request, auth }) {
            const isLoggedIn = !!auth?.user
            const isProtected = request.nextUrl.pathname.startsWith("/meetings/new")

            if (isProtected) return isLoggedIn

            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig;