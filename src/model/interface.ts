/**
 * Represents a user in the system.
 *
 * @param {string} id Optional.
 * @param {string} first_name
 * @param {string} lastname_name
 * @param {string} email
 * @param {string} password
 */
export interface IUser {
    id?: string;           // Optional user ID
    first_name: string;    // First name of the user
    last_name: string;     // Last name of the user
    email: string;         // Email address of the user
    password?: string;     // Optional password (used during user creation)
}

/**
 * Represents a post with its details.
 *
 * @param {string} id Optional.
 * @param {string} title
 * @param {string} content
 * @param {string} category
 * @param {string} author
 * @param {boolean} published
 * @param {Array<string>} tags
 * @param {string} imageUrl
 * @param {Array<string>} comments
 *
 */
export interface IPost {
    id?: string;                   // Optional post ID
    title: string;                 // Title of the post
    category?: string;             // Optional category of the post
    content: string;               // Content of the post
    author?: IUser;                // Author of the post (user details)
    published?: boolean;           // Indicates if the post is published
    tags: string[];                // Array of tags associated with the post
    imageUrl?: string;             // Optional URL for an image associated with the post
    createdAt?: string;            // Optional timestamp for post creation
    updatedAt?: string;            // Optional timestamp for post update
    comments?: Array<IComment>;    // Array of comments associated with the post
}

/**
 * Represents a comment on a post.
 */
export interface IComment {
    text: string;    // Text content of the comment
    author: string;  // Author of the comment (user or anonymous)
}
