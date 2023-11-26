
export interface IUser {
    id?: string;           // Optional user ID
    name?: string | null;
    username?: string | null;
    profilePic?: string | null;
    createdAt?: string | null;
    followers?: Array<IFollow>;
    following?: Array<IFollow>;
    email?: string | null;
    tweets?: Array<ITweet>;         // Email address of the user
    password?: string | null;     // Optional password (used during user creation)
}
export interface IFollow{
    id: string;
    followerId: string;
    followingId: string
}
export interface ITweet {
    id?: string;
    content?: string;
    user?: IUser;
    imageUrl?: string;
    like?: Array<ILike>;
    bookmark?: Array<IBookmark>;
    retweet?: Array<IRetweet>;
    reply?: Array<IReply>;
    createdAt?: string | null;
}

export interface IReply{
    id?: string;
    text?: string | null;
    user?: IUser;
}

export interface IBookmark{
    id?:string;
    user?: IUser;
}

export interface ILike{
    id?:string;
    user?: IUser;
}

export interface IRetweet{
    id?:string;
    user?: IUser;
}