class Post {
    private post_id: number;
    private title: string;
    private description: string;
    private date_posted: Date;
    private user_id: number;

    constructor(post_id: number, title: string, description: string, date_posted: Date, user_id: number) {
        this.post_id = post_id;
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.user_id = user_id;
    }

    getPostId(): number {
        return this.post_id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getDatePosted(): Date {
        return this.date_posted;
    }

    getUserId(): number {
        return this.user_id;
    }
}
export default Post;