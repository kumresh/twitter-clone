import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { headers } from 'next/dist/client/components/headers';
import { Session } from 'next-auth';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/_providers/auth-provider/auth-provider';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter',
  description: 'Generated by create next app',
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getSession(headers().get('cookie') ?? '');
  return (
    <html lang="en">
      <body>
        <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
          <div className="xl:max-w-[70vw] w-full h-full flex">
            <AuthProvider session={session}>
              {children}
            </AuthProvider>
          </div>
        </div>
        <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              theme="dark"
            />
      </body>
    </html>
  )
}
