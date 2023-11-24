import prisma from '@/lib/prisma';
import ApiUtils from '@/lib/api-utils';
import { hash } from 'bcryptjs';
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    let errorMessage = 'Something went wrong';
    try {
        const { email,name, password } = await req.json();

        const username = email.split("@")[0];
        // Check if the email is already in use
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return ApiUtils.sendErrorResponse('Email is already in use', 400);
        }

        // Hash the password before saving it to the database
        const hashedPassword = await hash(password, 10);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                name: name
                // Add any other fields you may have in your User model
            },
        });

        // Remove the password field from the response
        const { password: _, ...userWithoutPassword } = newUser;

        return ApiUtils.sendSuccessResponse({ user: userWithoutPassword });
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
