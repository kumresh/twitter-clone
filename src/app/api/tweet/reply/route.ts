import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';

    try {
        const { tweetId, text,imageUrl  } = await req.json();

        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return ApiUtils.sendErrorResponse('Unauthenticated user', 401);
        }

        if (!tweetId) {
            return ApiUtils.sendErrorResponse('Not found!', 404);
        }

        // Check if the user has already bookmarked the tweet
        const resply = await prisma.reply.create({
            data:{
                userId:userId,
                tweetId:tweetId,
                content:text,
                imageUrl:imageUrl
            }
        })

        return ApiUtils.sendSuccessResponse("Reply succefully!")
       
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