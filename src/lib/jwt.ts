import jwt, {JwtPayload} from "jsonwebtoken";

/**
 * Represents options for signing a JWT token.
 */
interface SignOption {
  /**
   * The expiration period for the token. It can be a string representing a
   * timespan or a number representing the expiration time in seconds.
   */
  expiresIn?: string | number;
}

/**
 * Default signing options for JWT tokens.
 */
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "5h",
};

/**
 * Signs a JWT access token using the provided payload and signing options.
 *
 * @param {JwtPayload} payload - The payload to be included in the JWT token.
 * @param {SignOption} options - Optional signing options, using the default if not provided.
 * @returns {Promise<string>} - A promise that resolves to the signed JWT access token.
 */
export async function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION): Promise<string> {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(payload, secretKey!, options);
}

/**
 * Verifies a JWT token and returns the decoded payload if the token is valid.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {JwtPayload | null} - The decoded JWT payload if the token is valid, otherwise null.
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const secretKey = process.env.SECRET_KEY;
    return jwt.verify(token, secretKey!) as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
