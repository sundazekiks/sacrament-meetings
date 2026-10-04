import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // Run middleware on all routes except static files and Next.js internals
    matcher: ["/meetings/new"],
};