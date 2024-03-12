import { Tag } from "./tagTypes";

export interface Post {
    post_id: string;
    title: string;
    description: string;
    date_posted: string;
    tags: Tag [];
    images: string [];
}

export interface BlogType {
    user_id: string;
    username: string;
    email: string;
    profile_pic: string;
    posts: Post[];
}

export type CreateBlogInputType = {
    title: string,
    description: string,
    tags: string[],
    user_id: string,
    images: FileList | [],
}