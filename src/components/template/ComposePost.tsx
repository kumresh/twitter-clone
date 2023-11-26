"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { MdInsertEmoticon } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import Utils from '@/lib/utils';

function ComposePost() {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState("");
  const session = useSession();
  const userId = session.data?.user.id;

  const router = useRouter();

  const toastMessage = useCallback((msg: string) => {
    toast.success(`${msg}`);
    router.refresh();
  }, [router]);

  const handlePost = useCallback(async () => {
    let imgUrl = null;
    if(imagePreview){
      imgUrl = await Utils.uploadImage(imagePreview, userId);
    }
    const data = {
      content: content,
      imageUrl: imgUrl
    }
    // console.log(data)
    const response = await fetch(`/api/tweet`, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      router.refresh();
      toastMessage(jsonResponse.data);
      setContent("");
      setImagePreview("");
    }

  }, [router, imagePreview, content]);


  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setContent(inputValue);
  };

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);
  
    // // Clear the input value
    // e.target.value = null;
  };

  const handleRemoveImage = (e:any)=>{
    e.preventDefault();
    setImagePreview('');
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setContent('');
    // setImagePreview('');
  };

  const isPostButtonDisabled = content.length <= 1;

  return (
    <div className="flex items-center w-full justify-start">
      <form className="w-full" onSubmit={handleSubmit}>
        <textarea
          placeholder="What is happening?"
          className="bg-black overflow-y-clip w-full py-2 px-2 text-md focus:outline-none resize-none"
          rows={Math.max(2, content.split('\n').length)} // Adjust this line
          value={content}
          onChange={handleInputChange}
        />
       {imagePreview &&  <div className="mr-6">
          <div onClick={handleRemoveImage} className="absolute text-3xl text-black hover:cursor-pointer">
          <IoCloseCircleSharp />
          </div>
          <Image className="rounded-xl w-fit h-80" src={imagePreview} alt="img" width={100} height={100} />
        </div>}
        <hr className="border-gray-600 mt-3 max-w-xl" />
        <div className="flex justify-between items-center mt-2">
          <div className="">
            <div className="cursor-pointer text-blue-400">
              <div className="flex items-center justify-center">
                <label className=" cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className='rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 '>
                    <FaRegImage />
                  </div>
                </label>

                <div className='rounded-full hover:bg-blue-500/20 transition duration-200 p-2 hover:text-blue-500 '>
                  <MdInsertEmoticon />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handlePost}
              type="submit"
              className={`${isPostButtonDisabled ? " bg-slate-500" : "bg-blue-500 hover:bg-blue-600"} py-1 px-3 rounded-3xl  capitalize text-xl`}
              disabled={isPostButtonDisabled}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComposePost;
