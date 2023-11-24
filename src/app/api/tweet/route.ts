import prisma from '@/lib/prisma';
import ApiUtils from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';
    try {
        const { content, imageUrl } = await req.json();

        const session = await getServerSession(authOptions);
        const tweetBy = session?.user?.id || "655f4b8592820640682194ef";
        if (!tweetBy){
            return ApiUtils.sendErrorResponse('Invalid Credential.', 401);
        }

        const createdTweet = await prisma.tweet.create({
            data: {
                content,
                imageUrl,
                tweetBy,
            },
        });

        if(!createdTweet){
            ApiUtils.sendErrorResponse("Something is wrong while creating tweet", 404);
        }
        return ApiUtils.sendSuccessResponse("Tweet created Successfully!");
    } catch (error) {
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            console.warn(error);
        }
    }
    return ApiUtils.sendErrorResponse(errorMessage);
}

export async function GET() {
    let errorMessage = 'Something went wrong';
    try {
        // const session = await getServerSession(authOptions);
        // if (!session){
        //     return ApiUtils.sendErrorResponse('Invalid Credential.', 401)
        // }

        const tweets = await prisma.tweet.findMany({
            select: {
                id:true,
                content:true,
                user: {
                    select:{
                        id:true,
                        name:true,
                        username:true,
                        profilePic:true,
                        email:true,
                        location:true,
                        dob:true,
                        createdAt:true
                    }
                },
                comments: true,
                hashTag: true,
                retweetBy: true,
                reply: true,
                bookmark: true,
                like:{
                    select:{
                        id:true
                    }
                },
            },
            orderBy: {
                createdAt: 'desc', // Order by creation date in descending order
            },
        });

        return ApiUtils.sendSuccessResponse({ tweets: tweets });
    } catch (error) {
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            console.warn(error);
        }
    }
    return ApiUtils.sendErrorResponse(errorMessage);
}