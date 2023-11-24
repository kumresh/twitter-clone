import { NextResponse } from 'next/server';

/**
 * Represents the response structure for an API request.
 *
 * If the request is successful, `success` is `true`, and the response includes
 * the requested data in the `data` property.
 *
 * If the request is unsuccessful, `success` is `false`, and an error message is
 * provided in the `errorMessage` property.
 */
export type ApiResponse =
  | {
      success: true;
      data: any;
    }
  | {
      success: false;
      errorMessage: string;
    };


/**
 * Utility functions for handling API responses.
 */
const ApiUtils = {
    /**
     * Sends an error response with the specified error message and status code.
     *
     * @param {string} error - The error message to be included in the response.
     * @param {number} status - The HTTP status code for the error response (default is 400).
     * @returns {NextResponse} - The Next.js response object with the error details.
     */
    sendErrorResponse: (error: string, status:number = 400): NextResponse => {
        const errorResponse: ApiResponse = {
            success: false,
            errorMessage: error,
        };
        return NextResponse.json(errorResponse, { status: status });
    },

    /**
     * Sends a success response with the provided data.
     *
     * @param {any} data - The data to be included in the success response.
     * @returns {NextResponse} - The Next.js response object with the success details.
     */
    sendSuccessResponse: (data: any): NextResponse => {
        const response: ApiResponse = {
            success: true,
            data: data,
        };
        return NextResponse.json(response, { status: 200 });
    },
};

export default ApiUtils;
