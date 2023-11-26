"use client";

import React, { useCallback } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IBookmark, ILike, ITweet } from '@/model/interface';
import Utils from '@/lib/utils';
import Avatar from './Avatar';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MyModal from '../modal/CommentModal';
interface TweetComponentProps {
    tweet: ITweet;
}

function ReplyPage({ tweet }: TweetComponentProps) {
    const session = useSession();
    const userId = session?.data?.user.id;
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleComment = ()=>{
        console.log(isOpen)
        setIsOpen(!isOpen);
    };

    const toastMessage = useCallback((msg: string) => {
        toast.success(`${msg}`);
        router.refresh();
    }, [router]);

    const handleLike = useCallback(async () => {
        const response = await fetch(`/api/tweet/like`, {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify({ tweet_id: tweet.id })
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            toastMessage(jsonResponse.data);
        }

    }, [tweet]);

    function isIdInList(list: IBookmark[] | ILike[]): boolean {
        return list.some(item => item.user?.id === userId);
    }

    const redirectTweetPage = () => {
        router.push(`/tweet/${tweet.id}`);
    }
    console.log(tweet.user)
    return (
        <>
            <div className="border-b-[1px]
                border-neutral-800 p-3 cursor-pointer hover:bg-slate-950 transition overflow-hidden">
                    <MyModal modelOpen={isOpen} setIsOpen={setIsOpen} tweet={tweet}/>
                <div className="flex space-x-2 m-2">
                    <Link href={`/${tweet.user?.id}`}><Avatar avatarUrl={tweet?.user?.profilePic ?? "/profile.jpg"} /></Link>

                    <div className="w-full flex flex-col overflow-hidden">
                        <div className="flex items-center w-full justify-between">
                            <div className="flex items-center w-full space-x-1">
                                <div className="font-bold capitalize hover:underline">
                                    <Link href={`/${tweet.user?.id}`}>   {tweet.user?.name}</Link>
                                </div>
                                <Link href={`/${tweet.user?.id}`} className="text-gray-500 hover:underline">@{tweet.user?.username}</Link>
                                <div className="text-gray-500">
                                    .
                                </div>
                                <div className="text-gray-500">
                                    {Utils.getFormatDate(tweet.createdAt ?? "")}
                                </div>
                            </div>
                            <div className="rounded-full hover:bg-blue-500/20 transition duration-200 p-2 cursor-pointer hover:text-blue-500">
                                <HiOutlineDotsHorizontal />
                            </div>
                        </div>
                        <div
                            // onClick={redirectTweetPage}
                            className="text-white/90 font-normal text-md w-full cursor-pointer pr-6 transition-all"
                        >
                            {tweet.content}
                        </div>
                        <div 
                        // onClick={redirectTweetPage} 
                        className="mr-6 mt-3 w-full">
                            {tweet.imageUrl && <div className="mr-6">
                                <Image className="rounded-xl w-fit h-80" src={tweet.imageUrl} alt="img" width={300} height={300} />
                            </div>}
                        </div>
                        <div className="flex items-center justify-between text-slate-500 mt-2 w-full">
                            <div onClick={handleComment} className="cursor-pointer hover:text-blue-500 ">
                                <div className="flex items-center justify-center">
                                    <div className='rounded-full hover:bg-blue-500/20 transition duration-200 p-2'>
                                        <FaRegComment />
                                    </div>{`${tweet.reply?.length != 0  && tweet.reply !== undefined  ? tweet.reply?.length : ""}`}
                                </div>
                            </div>
                            <div className="cursor-pointer hover:text-emerald-500">
                                <div className="flex items-center justify-center">
                                    <div className='rounded-full hover:bg-emerald-500/20 transition duration-200 p-2'>
                                        <FaRetweet />
                                    </div>{`${tweet.retweet?.length != 0  && tweet.retweet !== undefined ? tweet.retweet?.length : ""}`}
                                </div>
                            </div>
                            <div onClick={() => { handleLike() }} className={`cursor-pointer hover:text-pink-500 ${isIdInList(tweet.like ?? []) ? "text-pink-500" : ""}`}>
                                <div className="flex items-center justify-center">
                                    <div className='rounded-full hover:bg-pink-500/20 transition duration-200 p-2'>
                                        <FaRegHeart />
                                    </div>{`${tweet.like?.length != 0 && tweet.like !== undefined ? tweet.like?.length : ""}`}
                                </div>
                            </div>
                            {/* <div className="cursor-pointer hover:text-blue-500 ">
                                <div className="flex items-center justify-center">
                                    <div className='rounded-full hover:bg-blue-500/20 transition duration-200 p-2'>
                                        <BsGraphDownArrow />
                                    </div>{`12`}
                                </div>
                            </div> */}
                            <div className="cursor-pointer ">
                                <div className="flex flec">

                                    {/* <div onClick={() => { handleBookmark() }} className={`rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 ${isIdInList(tweet.bookmark ?? []) ? "text-blue-500" : ""}`}>
                                        <FaRegBookmark />
                                    </div> */}
                                    <div className='rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 '>
                                        <FiShare />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReplyPage;