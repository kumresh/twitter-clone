import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(_:NextRequest, { params }: { params: { user_id: string } }) {
    let errorMessage = 'Something went wrong';

    try {
        const user_id = params.user_id;

        const user = await prisma.user.findUnique({
            where: {
                id:user_id
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