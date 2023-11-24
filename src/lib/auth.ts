import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import {Adapter} from "next-auth/adapters";
import { PrismaAdapter } from '@auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: 'jwt',
    },
    callbacks:{
        jwt: async ({ user, token }: any) => {
            return { ...token, ...user};
        },
        session: async ({ session, token }: any) => {
            session.user = token;
            return session;
        },
    },
    // Store your secret securely using environment variables
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user.data.user;
                }
                return null;
            },
        }),
    ]
};
