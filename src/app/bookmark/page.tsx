import React from 'react';
import TweetComponent from '@/components/template/TweetComponent';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const getTweets = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tweet/bookmark`, {
        cache: "no-cache",
        method: "GET",
        headers: headers()
    });
    return await response.json();
}

async function BookmarkPage() {

    const session = await getServerSession(authOptions);
    if (!session){
        redirect("/login")
    }
    const jsonResponse = await getTweets();
    const data = jsonResponse.data;
    const tweets = data || data?.tweets.length > 0 ? data.tweets : [];

    return (
        <>
            <LeftSideBar />
            <main className="flex w-full h-full z-10 min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
                <h1 className="text-xl z-10 font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
                    Bookmark
                </h1>
                <div className="w-full items-stretch">
                    {
                        tweets.map((tweet:any) => (
                            <TweetComponent tweet={tweet.tweet} />
                        ))
                    }
                </div>

            </main>
            <RightSideBar />
        </>

    )
}

export default BookmarkPage;