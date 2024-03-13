import { UserProfile } from "../controllers/profileController";
import DatabaseConnection from "../database/DatabaseConnection";
import mysql from 'mysql';

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

        return new Promise(async (resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    console.log('Error starting transaction: ', err);
                    return;
                }
                connection.query(query, [data.title, data.description, new Date(), data.user_id], async (err, _) => {
                    try {
                        const result: any = await Post.getBlogId(connection, data.title, data.user_id);
                        try {
                            await Post.addPostTags(connection, result[0].post_id, data.tags);
                            await Post.addPostImages(connection, result[0].post_id, data.files);
                            connection.commit((err) => {
                                if (err) {
                                    console.error('Error committing transaction:', err);
                                    connection.rollback(() => {
                                        console.log('Transaction rolled back.');
                                    });
                                } else {
                                    console.log('Transaction committed successfully.');
                                }
                                dbconnection.closeConnection();
                                resolve(true);
                            });
                        } catch (err) {
                            Post.handleError(err, connection, reject, dbconnection);
                        }
                    } catch (err) {
                        Post.handleError(err, connection, reject, dbconnection);
                    }
                });

            });
        });
    }

    static handleError(err: any, connection: mysql.Connection, reject: any, dbconnection: DatabaseConnection) {
        console.log(err);
        connection.rollback(() => {
            dbconnection.closeConnection();
            reject(err);
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

    static async updateBlog(post_id: any, title: string, description: string, tags: string[]) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'UPDATE posts SET title = ?, description = ? WHERE post_id = ?';

        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(query, [title, description, post_id], async (err, _) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    try {
                        await Post.deleteBlogTags(connection, post_id);
                    }
                    catch (err) {
                        connection.rollback(() => {
                            reject(err);
                            dbconnection.closeConnection();
                            return;
                        });
                    }

                    try {
                        await Post.addPostTags(connection, post_id, tags);
                    }
                    catch (err) {
                        connection.rollback(() => {
                            reject(err);
                            dbconnection.closeConnection();
                            return;
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            console.log('Error committing transaction.');
                            connection.rollback(() => {
                                console.log('Transaction rolled back.');
                            })
                        } 
                        dbconnection.closeConnection();
                        resolve(true);
                    })

                });

            })

        });
    }

    static async deleteBlogTags(connection: mysql.Connection, post_id: any) {
        const query = 'DELETE FROM post_tags WHERE post_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [post_id], (err, _) => {
                if (err) {
                    reject (err);
                    return;
                }
                resolve (true);
            });
        });

    }

    static async addPostTags(connection: mysql.Connection, post_id: any, tags: string[]) {
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

            }
            else {
                reject("There are no tags");
            }
        });
    }

    static async addPostImages(connection: mysql.Connection, post_id: any, images: Express.Multer.File[]) {

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
        });
    }


    static async getBlogId(connection: mysql.Connection, title: string, user_id: string) {

        const query = 'SELECT post_id FROM posts WHERE title = ? AND user_id = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [title, user_id], (err, result) => {
                err ? reject(err) : resolve(result);
            });

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