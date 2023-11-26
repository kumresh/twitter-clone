import React from 'react';
import ComposePost from './template/ComposePost';
import TweetComponent from './template/TweetComponent';
import { ITweet } from '@/model/interface';
import { headers } from "next/headers"
import Avatar from './template/Avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const getTweets = async()=>{
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tweet`, {
    cache:"no-cache",
    method:"GET",
    headers: headers()
  });
  return await response.json();
}

async function MainPage(){
  const session = await getServerSession(authOptions);
  const jsonResponse = await getTweets();
  const tweets = jsonResponse.data?.tweets ?? []

  return (
    <main className="flex w-full h-full z-10 min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl z-10 font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
      <Avatar avatarUrl={session?.user.profilePic ?? "/profile.jpg"} />
        <ComposePost />
      </div>
      <div className="w-full items-stretch">
        {
          tweets.map((tweet:ITweet)=>(
            <TweetComponent tweet={tweet}/>
          ))
        }
      </div>
    </main>
  )
}

export default MainPage;