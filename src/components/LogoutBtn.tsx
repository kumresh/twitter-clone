"use client";
import { signOut } from 'next-auth/react';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

const LogoutBtn = () => {
  return (
    <button onClick={() => { signOut() }} className=" bg-white text-center hover:bg-blue-400 hover:text-white text-black text-xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-full px-3  py-2">
    <CiLogout /> <p className='hidden lg:block'>Logout</p>
</button>
  )
}

export default LogoutBtn