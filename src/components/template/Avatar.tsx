import Image from 'next/image';
import React from 'react'

interface IUserPic{
    avatarUrl: string;
}

function Avatar({avatarUrl}:IUserPic){
  return (
    <>
        <Image className="relative h-10 w-10 rounded-full" alt="name" width={40} height={40} src={avatarUrl} />
    </>
  )
}

export default Avatar;