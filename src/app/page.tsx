import MainPage from "@/components/MainPage";
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/login")
  }

  return (
    <>
      <LeftSideBar />
      <MainPage />
      <RightSideBar />
    </>

  )
}
