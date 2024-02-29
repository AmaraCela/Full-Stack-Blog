import DatabaseConnection from "../database/DatabaseConnection";
import bcryptjs from "bcryptjs";

class User {
    private user_id: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(user_id: number, username: string, email: string, password: string) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getUserId(): number {
        return this.user_id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    static async registerUser(username: string, email: string, password: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();
        const hashedPassword = await bcryptjs.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            connection.query(query, [username, email, hashedPassword], (err, result) => {

                if (err) {
                    console.log("There was an error signing up the user", err.code, err);
                    err.code === 'ER_DUP_ENTRY' ? resolve(false) : reject(err);
                } else {
                    resolve(true);
                }
            });

            dbconnection.closeConnection();
        });
    }

    static async getUserByUsername(username: string, password: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'SELECT user_id, email, password FROM users WHERE username = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [username], async (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    resolve("Invalid username.");
                }
                else {

                    const isValid = await bcryptjs.compare(password.toString(), result[0].password);
                    isValid ? resolve({ user_id: result[0].user_id, username: username, email: result[0].email }) : resolve("Invalid password.")
                }
            });

            dbconnection.closeConnection();
        });
    }


    static async updateUsernameAndEmail(username: string, email: string, user_id: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();
        const query = 'UPDATE users SET username = ?, email = ? WHERE user_id = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [username, email, user_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                else if (result.changedRows === 0) {
                    resolve("No information has changed.");
                }
                else {
                    resolve({
                        user_id: user_id,
                        username: username,
                        email: email
                    });
                }
            });

            dbconnection.closeConnection();
        });
    }


    static async changePassword(username: string, password: string) {
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();
        const query = 'UPDATE users SET password = ? WHERE username = ?';
        const hashedPassword = await bcryptjs.hash(password.toString(), 10);

        return new Promise((resolve, reject) => {
            connection.query(query, [hashedPassword, username], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    result.changedRows === 0 ? resolve(false) : resolve(true);
                }

            });

            dbconnection.closeConnection();
        });
    }

}

export default User;