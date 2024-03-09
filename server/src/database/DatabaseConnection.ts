import { error } from 'console';
import mysql from 'mysql';

class DatabaseConnection {
    private connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection(
            {
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            }
        );

        this.connection.connect((err) => {
            if (err) {
                console.log("There was an error connecting to the database");
            }
            else {
                console.log("Connection successful");
            }
        });
    }

    getConnection(): mysql.Connection {
        return this.connection;
    }

    closeConnection(): void {
        this.connection.end((err) => {
            
            if (err) {
                console.log("There was an error closing the connection");
                console.log(error);
            }
            else {
                console.log("Connection closed successfully");
            }
        });
    }
}

export default DatabaseConnection;