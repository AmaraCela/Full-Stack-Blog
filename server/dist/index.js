"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateTables_1 = __importDefault(require("./database/CreateTables"));
const express = require('express');
const app = express();
const port = 5000;
const createTables = new CreateTables_1.default();
// createTables.createUsers();
// createTables.createPosts();
// createTables.createTags();
createTables.createPostTags();
// createTables.createImages();
app.get('/', (req, res) => {
    res.send('Hello from Express');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
