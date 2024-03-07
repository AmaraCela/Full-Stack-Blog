"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class DatabaseConnection {
    constructor() {
        this.connection = mysql_1.default.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "blog_database"
        });
        this.connection.connect((err) => {
            if (err) {
                console.log("There was an error connecting to the database");
            }
            else {
                console.log("Connection successful");
            }
        });
    }
    getConnection() {
        return this.connection;
    }
    
    closeConnection() {
        this.connection.end((err) => {
            if (err) {
                console.log("There was an error closing the connection");
            }
            else {
                console.log("Connection closed successfully");
            }
        });
    }
}
exports.default = DatabaseConnection;
