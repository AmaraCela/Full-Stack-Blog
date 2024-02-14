"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const DatabaseConnection_1 = __importDefault(require("../database/DatabaseConnection"));
function signup(req, res) {
    const dbconnection = new DatabaseConnection_1.default();
    const connection = dbconnection.getConnection();
    const { username, email, password } = req.body;
    console.log(req.body.username);
    dbconnection.closeConnection();
}
exports.signup = signup;
