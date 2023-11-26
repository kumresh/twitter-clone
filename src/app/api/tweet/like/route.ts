import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';

    try {
        const {tweet_id} = await req.json();

        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return ApiUtils.sendErrorResponse('Unauthenticated user', 401);
        }

        if (!tweet_id) {
            return ApiUtils.sendErrorResponse('Not found!', 404);
        }

        // Check if the user has already liked the tweet
        const existingLike = await prisma.like.findFirst({
            where: {
                tweetId: tweet_id,
                userId: userId
            },
        });
        if (existingLike) {
            // User has already liked the tweet, so unlike it
            await prisma.like.delete({
              where: { id: existingLike.id },
            })
        
            return ApiUtils.sendSuccessResponse("Unlike!");
        } else {
            // User has not liked the tweet, so like it
            await prisma.like.create({
              data: {
                userId: userId,
                tweetId: tweet_id,
              },
            });
            return ApiUtils.sendSuccessResponse("Liked!");
        }

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