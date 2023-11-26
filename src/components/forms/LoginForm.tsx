"use client";

import Link from "next/link";
import {FieldValues, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4,"Password must at lest 4 characters.")
})
export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors,isSubmitting}
    } = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = useCallback(async (data: FieldValues)=>{
        const response = await signIn('credentials',{
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(response)
        if(response?.ok){
            router.push('/');
            router.refresh();
        }
    },[router])

    return (
        <section className="bg-black min-h-screen min-w-full">
            <div className="text-white ">
                <h2 className=" capitalize text-2xl mb-5 md:text-3xl font-bold text-center pt-8">Login</h2>
                <div className="w-full max-w-sm mx-auto rounded-lg shadow sm:p-6 md:p-8 bg-slate-900">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to Twitter</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  />
                            {errors.email && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.email.message}`}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" {...register('password')} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                            {errors.password && (
                                <p className="text-red-500 mt-2 text-xs">{`${errors.password.message}`}</p>
                            )}
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                                </div>
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <Link href="/reset-password" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forget Password?</Link>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
};
