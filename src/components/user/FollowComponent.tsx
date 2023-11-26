"use client";

import { IFollow } from '@/model/interface';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify';
interface FollowData{
    followerId: string | undefined;
    followers: Array<IFollow> | undefined;
}
const FollowComponent = ({followerId, followers}:FollowData) => {
    const session = useSession();
    const userId = session.data?.user.id;
    const router = useRouter();

    const handleFollow = useCallback(async () => {
        // console.log("first")
        const response = await fetch(`/api/user/follow`, {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify({ followerId: followerId })
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            toast.success(jsonResponse.data);
            router.refresh();
        }
        console.log(jsonResponse)
    
    }, [router]);

    function isFollowing(userId: string, relationships: IFollow[]): boolean {
        return relationships.some((relationship) => relationship.followingId === userId);
    }
    const isFollow = isFollowing(userId ?? "", followers ?? []);
    const valueFollow = isFollow ? "Following" : "Follow";
 
  return (
    <>
    {userId !== followerId ?
    <span onClick={handleFollow} className=" bg-white text-black font-bold rounded-3xl px-3 py-2 hover:bg-slate-200 hover:cursor-pointer">
        {valueFollow}
    </span>:""}
    </>
  )
}

export default FollowComponent;