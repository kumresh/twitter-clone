import Utils from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { MdInsertEmoticon } from 'react-icons/md';
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ITweet } from '@/model/interface';
import Avatar from '../template/Avatar';

interface MyModalProps {
  modelOpen: boolean;
  setIsOpen: Function;
  tweet: ITweet;
}

export default function MyModal({ modelOpen, setIsOpen, tweet }: MyModalProps) {
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
      text: content,
      imageUrl: imgUrl,
      tweetId: tweet.id
    }
    const response = await fetch(`/api/tweet/reply`, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      setIsOpen(!modelOpen);
      toastMessage(jsonResponse.data);
      router.refresh();
    }

  }, [router, imagePreview]);


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

  const handleRemoveImage = (e: any) => {
    e.preventDefault();
    setImagePreview('');
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setContent('');
    // setImagePreview('');
  };

  const isPostButtonDisabled = content.length <= 1;

  function closeModal() {
    setIsOpen(!modelOpen)
  }

  return (
    <>
      <Transition appear show={modelOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Dialog.Overlay className="fixed inset-0 backdrop-filter bg-slate-500 opacity-20" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex space-x-2">
                      <Avatar avatarUrl={tweet.user?.profilePic ?? "/profile.jpg"} />

                      <div className="">
                        <div className="flex items-center w-full justify-between">
                          <div className="flex items-center w-full space-x-1">
                            <div className="font-bold capitalize hover:underline">
                              {tweet.user?.name}
                            </div>
                            <div className="text-gray-500 hover:underline">@{tweet.user?.username}</div>
                            <div className="text-gray-500">
                              .
                            </div>
                            <div className="text-gray-500">
                              {Utils.getFormatDate(tweet.createdAt ?? "")}
                            </div>
                          </div>
                          {/* <button className="bg-blue-500 px-2 rounded-2xl py-1 capitalize hover:bg-blue-600">
                          draft
                        </button> */}
                        </div>

                        <div className="line-clamp-2">
                          {tweet.content}
                        </div>

                        <div className="mt-2">
                          <span className="text-slate-500">Replying to</span> <span className="text-blue-500">@{tweet.user?.username}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Avatar avatarUrl={session.data?.user.profilePic ?? "/profile.jpg"} />
                      <div className="w-full">
                        <textarea
                          placeholder="What is happening?"
                          className="bg-black overflow-y-clip w-full py-2 px-2 text-md focus:outline-none resize-none"
                          rows={Math.max(2, content.split('\n').length)} // Adjust this line
                          value={content}
                          onChange={handleInputChange}
                        />
                        {imagePreview && <div className="mr-6">
                          <div onClick={handleRemoveImage} className="absolute text-3xl text-black hover:cursor-pointer">
                            <IoCloseCircleSharp />
                          </div>
                          <Image className="rounded-xl w-fit h-80" src={imagePreview} alt="img" width={100} height={100} />
                        </div>}

                        <div className="cursor-pointer text-blue-400 flex justify-between">
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

                          <button onClick={handlePost}
                            type="submit"
                            className={`${isPostButtonDisabled ? " bg-slate-500" : "bg-blue-500 hover:bg-blue-600"} py-1 px-3 rounded-3xl text-white  capitalize text-xl`}
                            disabled={isPostButtonDisabled}
                          >
                            send
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
