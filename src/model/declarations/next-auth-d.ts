import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    provider: string;
    user: {
      profilePic?:string;
      id?: string;
    } & DefaultSession['user'];
  }
}
