import React from 'react';
import { ITweet } from '@/model/interface';
import { headers } from "next/headers"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import TweetComponent from '@/components/template/TweetComponent';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import ReplyPage from '@/components/template/ReplyComponent';
import { redirect } from 'next/navigation';

const getTweets = async(id: string)=>{
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tweet/${id}`, {
    cache:"no-cache",
    method:"GET",
    headers: headers()
  });
  return await response.json();
}

async function PostPage( { params }: { params: { tweetId: string } }){
  const session = await getServerSession(authOptions);
  if (!session){
      redirect("/login")
  }
  // const session = await getServerSession(authOptions);
  const jsonResponse = await getTweets(params.tweetId);
  const tweets = jsonResponse.data?.tweet ?? {};
  // console.log(tweets.reply)
  
  return (
  <>
  <LeftSideBar/>
    <main className="flex w-full h-full z-10 min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl z-10 font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Post
      </h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
      </div>
      <div className="w-full items-stretch">
       <TweetComponent tweet={tweets}/>
      </div>
      <div>
      {
          tweets.reply.map((tweet:ITweet)=>(
            <ReplyPage tweet={tweet}/>
          ))
        }
      </div>
    </main>
    <RightSideBar/>
  </>
  )
}

export default PostPage;