import DatabaseConnection from "../database/DatabaseConnection";

class Post {
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