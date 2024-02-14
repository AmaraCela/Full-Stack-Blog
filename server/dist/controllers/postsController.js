"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const DatabaseConnection_1 = __importDefault(require("../database/DatabaseConnection"));
function getPosts(req, res) {
    const dbconnection = new DatabaseConnection_1.default();
    const connection = dbconnection.getConnection();
    const query = `SELECT * FROM posts`;
    connection.query(query, (err, results) => {
        if (err) {
            console.log("An error occurred when retrieving data");
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(results);
        }
    });
    dbconnection.closeConnection();
}
exports.getPosts = getPosts;
module.exports = { getPosts };
