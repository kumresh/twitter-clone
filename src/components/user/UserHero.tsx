import Image from 'next/image'
import React from 'react'
interface UserImage{
    avatar: string;
}
const UserHero = ({avatar}:UserImage) => {
  return (
    <div>
    <div className="bg-neutral-700 h-44 relative">
      {avatar&& (
        <Image src={avatar} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
      )}
      <div className="absolute -bottom-16 left-4">
      {avatar && <Image src={avatar} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>}
      </div>
    </div>
  </div>
  )
}

export default UserHero