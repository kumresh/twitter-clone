import {NextRequest} from "next/server";
import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest) {
    let errorMessage = 'Something went wrong';
    try {
        const { name,profilePic,location, dob  } = await req.json();
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId){
            return ApiUtils.sendErrorResponse('Invalid Credential.', 401)
        }

        const updateUser = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                name,
                profilePic,
                location,
                dob
            }
        });
        if(!updateUser){
            return ApiUtils.sendErrorResponse('Unable to update profile', 401)
        }
        return ApiUtils.sendSuccessResponse( "Profile updated successfully!");
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
