import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import FollowComponent from '@/components/user/FollowComponent';
import { authOptions } from '@/lib/auth';
import Utils from '@/lib/utils';
import { IUser } from '@/model/interface';
import { getServerSession } from 'next-auth';

import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useCallback } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosNotificationsOutline, IoMdMore } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';

const getUser = async (userID: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${userID}`, {
    cache: "no-cache",
    method: "GET",
    headers: headers()
  });
  return await response.json();
}

async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login")
  }

  const jsonResponse = await getUser(params.username);
  const data = jsonResponse.data.user as IUser;
  return (
    <>
      <LeftSideBar />
      <div className=" w-full">
        <div className="flex space-x-3 items-center mb-3">
          <div className="left">
            <button className="text-2xl">
              <IoArrowBackOutline />
            </button>
          </div>
          <div className="">
            <h1 className="m-0 text-2xl capitalize font-bold">{data.name}</h1>
            <p className="text-slate-500">{data?.tweets?.length != 0 || data.tweets !== undefined ? data.tweets?.length : ""} {`Tweet`}</p>
          </div>
        </div>
        <div className="">
          <Image className="w-full h-52" width={300} height={300} src={"https://firebasestorage.googleapis.com/v0/b/tweeter-clone-af770.appspot.com/o/upload%2F656316cf4a41188dfa57f096%2Fphoto-1506038634487-60a69ae4b7b1.avif?alt=media&token=568e7079-bb41-4e37-addc-100cdb03911b"} alt='cover image' />
        </div>
        <div className="flex justify-between -mt-8">
          <a className=" ">
            <Image className="rounded-full h-32 w-32" width={300} height={300} src={data.profilePic ?? "/profile.jpg"} alt='cover image' />
          </a>
          <div className="flex items-center space-x-1">
            <div className=' text-xl rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 '>
              <IoMdMore />
            </div>
            <div className=' text-xl rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 '>

              <IoIosNotificationsOutline />
            </div>
            <FollowComponent followerId={params.username} followers={data.followers}/>
          </div>
        </div>
        <div className="p-1">
          <div >
            <h1 className="m-0">{data.name}</h1>
            <p className=" text-slate-700">@{data.username}</p>
          </div>
          {/* <div className="profile-description">
            <p className="text-slate-700">@{`hello`}</p>
          </div> */}
          <div className=" mt-3 space-y-2">
            {/* {data<a className=" flex items-center"><IoLocateOutline /> <span className="bold-dull-para pl-1">{``}</span></a>}
            {<a className=" flex items-center"><FaLink /> <span className="bold-dull-para pl-1">{``}</span></a>} */}
            <a className=" flex items-center"><CiCalendarDate /> <span className="bold-dull-para pl-1">Joined {Utils.getFormatDate(data.createdAt ?? "")}</span></a>
          </div>
          <div className="">

          </div>
        </div>
      </div>
      <RightSideBar />
    </>
  )
}

export default ProfilePage;