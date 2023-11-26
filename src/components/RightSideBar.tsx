import React from 'react'

export default function RightSideBar() {
  const categorys = [
    {
      category: "Sports",
      tag: "HardikPandya",
      posts:52.6
    },
    {
      category: "politics",
      tag: "Melania",
      posts:42.3
    },
    {
      category: "Tech",
      tag: "openAI",
      posts:32.9
    },
  ]
  return (
    <div className="hidden md:block top sticky">
      <div className="flex">
        <div className="rounded-xl mx-3 bg-[#11161c] px-5 py-3 mt-5">
          <h3 className="text-2xl text-white capitalize whitespace-nowrap">What’s happening</h3>
          <div className="mt-3">
            {
              categorys.map((item:any, idx)=>(
                <div key={idx + 1} className=" mt-5">
                  <div className="text-slate-600 capitalize text-sm">{item.category}{`. Trending`}</div>
                  <div className="text-white font-bold hover:cursor-pointer text-xl">{`#`}{item.tag}</div>
                  <div className="text-slate-600 capitalize text-sm">{item.posts}{`posts`}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
