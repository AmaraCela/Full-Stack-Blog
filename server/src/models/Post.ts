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


    static async addPostTags(post_id: any, tags: string[]) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            for (let i = 0; i< tags.length; i++) {
                connection.query(query, [post_id, tags[i]], (err, _) => {
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

    static async addPostImages(post_id: any, images: Express.Multer.File[]) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'INSERT INTO images (post_id, image) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            for (let i = 0; i< images.length; i++) {
                connection.query(query, [post_id, images[i].path], (err, _) => {
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
}

export default Post;