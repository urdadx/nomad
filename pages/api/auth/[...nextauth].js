import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';
import NextAuth from 'next-auth/next';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    newUser: '/home',
    signIn: '/login',
    error: '/login',
    verifyRequest: '/home',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : 'user',
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.email = token.email;
      return session;
    },
    async sendVerificationRequest({
      identifier: email,
      url,
      baseUrl,
      provider,
    }) {
      // Use nodemailer to send the email
      const transport = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
        },
      });

      await transport.sendMail({
        from: process.env.NEXT_PUBLIC_EMAIL_FROM,
        to: email,
        subject: 'Sign in to your account',
        text: `${url}`,
        html: `<p>${url}</p>`,
      });
    },
  },
  redirect() {
    return '/home';
  },
};

export default NextAuth(authOptions);
