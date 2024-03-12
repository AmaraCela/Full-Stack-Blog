import { UserProfile } from "../controllers/profileController";
import DatabaseConnection from "../database/DatabaseConnection";

export type PostData = {
    title: string;
    description: string;
    user_id: string;
    tags: string[];
    files: Express.Multer.File[];
}

class Post {
    static async postBlog(data: PostData) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO posts (title, description, date_posted, user_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            connection.query(query, [data.title, data.description, new Date(), data.user_id], async (err, _) => {
                if (err) {
                    reject(err);
                }
                else {
                    try {
                        const result: any = await Post.getBlogId(data.title, data.user_id);
                        try {
                            await Post.addPostTags(result[0].post_id, data.tags);
                        }
                        catch (err) {
                            console.log(err);
                            return reject(err);
                        }
                        try {
                            await Post.addPostImages(result[0].post_id, data.files);
                        }
                        catch (err) {
                            console.log(err);
                            return reject(err);
                        }
                    }
                    catch (err) {
                        console.log(err);
                        reject(err);
                    }

                }
                resolve(true);
            });

            dbconnection.closeConnection();
        });
    }

    static async deleteBlog(post_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'DELETE FROM posts WHERE post_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [post_id], (err, _) => {
                err ? reject(err) : resolve(true);
            });
            dbconnection.closeConnection();
        });
    }

    static async addPostTags(post_id: any, tags: string[]) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            if (tags) {
                for (const element of tags) {
                    connection.query(query, [post_id, element], (err, _) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(true);
                        }
                    });
                }
                reject("There are no tags");
            }
            dbconnection.closeConnection();
        });
    }

    static async addPostImages(post_id: any, images: Express.Multer.File[]) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO images (post_id, image) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            for (const element of images) {
                connection.query(query, [post_id, element.path], (err, _) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }

                });
            }
            dbconnection.closeConnection();
        });
    }


    static async getBlogId(title: string, user_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'SELECT post_id FROM posts WHERE title = ? AND user_id = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [title, user_id], (err, result) => {
                err ? reject(err) : resolve(result);
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
                err ? reject(err) : resolve(results);
            });

            dbconnection.closeConnection();
        });
    }

    static async getBlogById(post_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = `SELECT 
        u.user_id,
        u.username,
        u.email,
        p.post_id,
        p.title,
        p.description,
        p.date_posted,
        t.tag_id,
        t.tag_name,
        i.image
        FROM posts p 
        LEFT JOIN users u ON p.user_id = u.user_id 
        LEFT JOIN post_tags pt ON p.post_id = pt.post_id 
        LEFT JOIN tags t ON pt.tag_id = t.tag_id
        LEFT JOIN images i ON p.post_id = i.post_id 
        WHERE p.post_id = ?`;

        return new Promise((resolve, reject) => {
            connection.query(query, [post_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const structuredResult = this.generateStructuredResult(result);
                    resolve(structuredResult);
                }
            });
            dbconnection.closeConnection();
        });
    }

    static async getPostsOfUser(user_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = `
        SELECT
        u.user_id,
        u.username,
        u.email,
        p.post_id,
        p.title,
        p.description,
        p.date_posted,
        t.tag_id,
        t.tag_name,
        i.image
        FROM
        users u
        LEFT JOIN posts p ON u.user_id = p.user_id
        LEFT JOIN post_tags pt ON p.post_id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.tag_id
        LEFT JOIN images i ON p.post_id = i.post_id
        WHERE
        u.user_id = ?;
    `;

        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else if (!result || result.length === 0) {
                    resolve(false);
                } else {
                    const structuredResult: UserProfile = this.generateStructuredResult(result);
                    resolve(structuredResult);
                }

            });
            dbconnection.closeConnection();
        });
    }

    static generateStructuredResult(result: any) {
        return {
            user_id: result[0].user_id,
            username: result[0].username,
            email: result[0].email,
            posts: result.reduce((acc: any[], row: any) => {
                if (acc.length === 0) {
                    acc.push(Post.newEntry(row));
                } else {
                    const existingPost = acc.find((post) => post.post_id === row.post_id);
                    if (existingPost) {
                        const existingTag = existingPost.tags.find((tag: { tag_id: any; }) => tag.tag_id === row.tag_id);
                        if (!existingTag) {
                            existingPost.tags.push({ tag_id: row.tag_id, tag_name: row.tag_name });
                        }

                        const existingImage = existingPost.images.find((image: any) => image === row.image);
                        if (!existingImage) {
                            existingPost.images.push(row.image);
                        }
                    } else {
                        acc.push(Post.newEntry(row));
                    }
                }
                return acc;
            }, [])
        };
    }

    static newEntry(row: any) {
        return {
            post_id: row.post_id,
            title: row.title,
            description: row.description,
            date_posted: row.date_posted,
            tags: [{ tag_id: row.tag_id, tag_name: row.tag_name }],
            images: [row.image],
        }
    }
}

export default Post;