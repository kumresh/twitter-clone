import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(_:NextRequest, { params }: { params: { tweet_id: string } }) {
  let errorMessage = 'Something went wrong';

  try {
    const tweet_id = params.tweet_id;

    if (!tweet_id) {
      return ApiUtils.sendErrorResponse('Not found!', 404);
    }

    const tweet = await prisma.tweet.findUnique({
      where: { id: tweet_id },
      select:{
        id:true,
        content:true,
        imageUrl:true,
        reply:{
          select:{
            createdAt:true,
            content:true,
            imageUrl:true,
            tweet:true,
            user:true
          }
        },
        user:{
            select:{
              id:true,
                name:true,
                username:true,
                email:true,
                profilePic:true
            }
        },
        createdAt:true,
        like:{
          select:{
            id:true
          }
        },
        retweet:{
            select:{
                user:{
                    select:{
                        name:true,
                        username:true,
                        email:true,
                        profilePic:true
                    }
                },
                tweet:{
                    select:{
                        id:true,
                        content:true,
                        imageUrl:true,
                        createdAt:true
                    }
                }
            },
        
        }
      }
    });

    if (!tweet) {
      return ApiUtils.sendErrorResponse('Unable to fetch Applications', 500);
    }

    return ApiUtils.sendSuccessResponse({ tweet: tweet });
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
