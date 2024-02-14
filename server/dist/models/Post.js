"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(post_id, title, description, date_posted, user_id) {
        this.post_id = post_id;
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.user_id = user_id;
    }
    getPostId() {
        return this.post_id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getDatePosted() {
        return this.date_posted;
    }
    getUserId() {
        return this.user_id;
    }
}
exports.default = Post;
