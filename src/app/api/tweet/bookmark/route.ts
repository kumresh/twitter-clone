import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';

    try {
        const { tweet_id } = await req.json();

        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return ApiUtils.sendErrorResponse('Unauthenticated user', 401);
        }

        if (!tweet_id) {
            return ApiUtils.sendErrorResponse('Not found!', 404);
        }

        // Check if the user has already bookmarked the tweet
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                tweetId: tweet_id,
                userId: userId,
            },
        });

        if (existingBookmark) {
            // User has already bookmarked the tweet, so remove the bookmark
            await prisma.bookmark.delete({
                where: { id: existingBookmark.id },
            });

            return ApiUtils.sendSuccessResponse("Bookmark removed!");
        } else {
            // User has not bookmarked the tweet, so add the bookmark
            await prisma.bookmark.create({
                data: {
                    userId: userId,
                    tweetId: tweet_id,
                },
            });

            return ApiUtils.sendSuccessResponse("Bookmarked!");
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


export async function GET(_:NextRequest) {
    let errorMessage = 'Something went wrong';
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return ApiUtils.sendErrorResponse('Invalid Credential.', 401)
        }

        const tweets = await prisma.bookmark.findMany({
            where: {
                userId: userId
            },
            select: {
                tweet: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        imageUrl:true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                profilePic: true
                            }
                        },
                        hashTag: true,
                        retweet: {
                            select: {
                                id: true
                            }
                        },
                        reply: true,
                        bookmark: {
                            select: {
                                id: true
                            }
                        },
                        like: {
                            select: {
                                id: true
                            }
                        },
                    }
                }
            },
            orderBy: {
                id: 'desc', // Order by creation date in descending order
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