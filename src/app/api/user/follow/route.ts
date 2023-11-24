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
      const userId = session?.user?.id || "655f4cbb92820640682194f0";
      
      if (!userId) {
        return ApiUtils.sendErrorResponse('Unauthorize user', 405);
      }

      // Find the Follow record for the follower and following users
      const existingFollow = await prisma.follow.findFirst({
        where: {
          followerId: followerId,
          followingId: userId,
        },
      });
  
      if (existingFollow) {
         // User is already following, so unfollow
        await prisma.follow.delete({
          where: { id: existingFollow.id },
        });
        return ApiUtils.sendSuccessResponse('unfollowed');
      }else{
        await prisma.follow.create({
          data: {
            followerId: followerId,
            followingId: userId,
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