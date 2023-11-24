import Link from "next/link";
import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaHome, FaBookmark, FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { RiMessage2Fill } from "react-icons/ri";



export default function LeftSideBar() {
    const NAVIGATION_ITEMS = [
        {
            title: "Twitter",
            icon: FaSquareXTwitter,
        },
        {
            title: "Home",
            icon: FaHome,
        },
        {
            title: "Explore",
            icon: IoIosSearch,
        },
        {
            title: "Notifications",
            icon: GoBellFill,
        },
        {
            title: "Messages",
            icon: RiMessage2Fill,
        },
        {
            title: "Bookmarks",
            icon: FaBookmark,
        },
        {
            title: "Profile",
            icon: FaUser,
        },
    ];
    return (
        <section className=" sticky top-0 xl:flex flex-col items-stretch h-screen px-4">
            <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                {NAVIGATION_ITEMS.map((item) => (
                    <Link
                        className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-full p-3"
                        href={
                            item.title.toLocaleLowerCase() === "home"
                                ? "/"
                                : item.title.toLocaleLowerCase() === "profile"
                                    ? "#"
                                    : `/${item.title.toLowerCase()}`
                        }
                        key={item.title}
                    >
                        <div>
                            <item.icon />
                        </div>
                        {item.title !== "Twitter" && <div className="hidden lg:block">{item.title}</div>}
                    </Link>
                ))}
            </div>
        </section>
    )
}
