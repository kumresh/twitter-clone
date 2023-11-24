import {NextRequest} from "next/server";
import ApiUtils from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import {compare} from "bcryptjs";
import {signJwtAccessToken} from "@/lib/jwt";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';
    try {

        const {email, password} = await req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (!user){
            return null
        }
        const passwordCorrect = await compare(password, user?.password);
        if(passwordCorrect && user){
            const { password: _, ...userWithoutPass } = user;
            const accessToken = await signJwtAccessToken(userWithoutPass);
            const result = {
                ...userWithoutPass,
                accessToken,
            };
            return ApiUtils.sendSuccessResponse({user: result});
        }
        return ApiUtils.sendErrorResponse('Invalid Credential.', 401)
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