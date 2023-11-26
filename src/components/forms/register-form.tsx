"use client";

import Link from 'next/link';
import React, {useCallback, useState} from 'react';
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import { toast } from 'react-toastify';

const SignUpSchema = z.object({
    name: z.string().min(3, "name must be at least 3 character"),
    email: z.string().email(),
    password: z.string().min(4,"Password must at lest 4 characters."),
    password2: z.string().min(4),
}).refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"], // path of error
})

const RegistrationForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors,isSubmitting}
    } = useForm({
        resolver: zodResolver(SignUpSchema)
    });

    const onSubmit = useCallback(async (data: FieldValues)=>{

        const response = await fetch('/api/auth/register',{
            method: "POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json",
            },
            cache:"no-store"
        });
        const jsonResponse = await response.json();

        if(jsonResponse?.success){
            toast.success(`${jsonResponse.data}`);
            router.push('/login');
            router.refresh();
        }else{
            toast.success(`${jsonResponse.data}`);
        }
    },[router])

    return (
        <section className="bg-black min-h-screen w-full">

            <div className="text-white ">
                <h2 className=" capitalize text-2xl md:text-3xl mb-5 font-bold text-center pt-8">Sign Up</h2>
                <div className="w-full max-w-sm mx-auto rounded-lg shadow sm:p-6 md:p-8 bg-slate-900">

                    <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6" noValidate>
                        <h5 className="text-xl font-medium text-gray-900 pb-5 dark:text-white">Register into our platform</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full name</label>
                            <input type="email" {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            {errors.name && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.name.message}`}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            {errors.email && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.email.message}`}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="••••••••"
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white `}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.password.message}`}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password (Again)</label>
                            <input
                                type="password"
                                {...register('password2')}
                                placeholder="••••••••"
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white `}
                                required
                            />
                            {errors.password2 && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.password2.message}`}</p>
                            )}
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input name='remember' id="remember"  type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Accept the <Link className="text-sky-500" href="/">Terms and Conditions</Link> </label>
                            </div>

                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:emerald:ring-blue-800">Create an account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Have an Account? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default RegistrationForm;
