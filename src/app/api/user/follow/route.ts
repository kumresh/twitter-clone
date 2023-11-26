import prisma from '@/lib/prisma';
import ApiUtils from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';
    try {
      const { followerId } = await req.json(); 
      // Assuming you have the follower's ID from your authentication
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
      
      
      if (!userId) {
        return ApiUtils.sendErrorResponse('Unauthorize user', 405);
      }

      const isFollowing = await prisma.follow.findFirst({
        where:{
          followerId: followerId,
          followingId: userId
        } 
      });
      
      if(isFollowing){
        await prisma.follow.delete({
          where:{
            id:isFollowing.id
          }
        });
        return ApiUtils.sendSuccessResponse("Unfollow");
      }else{
        await prisma.follow.create({
          data: {
            follower: {connect:{id: followerId}},
            following: {
              connect:{id: userId}
            },
          },
        });
        return ApiUtils.sendSuccessResponse("follow");
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

        const user = await prisma.user.findUnique({
            where: {
                id:"655f4b8592820640682194ef"
            },
            select:{
                name:true,
                username:true,
                email:true,
                createdAt:true,
                dob:true,
                location:true,
                profilePic:true,
                like:true,
                tweets:true,
                followers:true,
                following:true
            }
        });

        if (!user){
            return  ApiUtils.sendErrorResponse('Unable to fetch account', 403)
        }
        return ApiUtils.sendSuccessResponse({user: user});
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