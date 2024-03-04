import DatabaseConnection from "../database/DatabaseConnection";

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

    static async postBlog(title: string, description: string, user_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO posts (title, description, date_posted, user_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            connection.query(query, [title, description, new Date(), user_id], (err, result) => {
                err ? reject(err) : resolve(true);
            });

            dbconnection.closeConnection();
        });
    }

    static async getPosts() {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();
        const query = 'SELECT * FROM posts';

        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                err ? reject (err) : resolve(results);
            });
    
            dbconnection.closeConnection();
        });
    }
}

export default Post;