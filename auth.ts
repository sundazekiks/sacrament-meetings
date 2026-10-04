import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log({ ...credentials })
                // Add your own logic here to validate the user
                if (credentials.username === "BishopJude" && credentials.password === "Jude123") {
                    return { id: "1", name: "Bishop", email: "bishop@example.com" };
                }
                return null;
            }
        })
    ]
})