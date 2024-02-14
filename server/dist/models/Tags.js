"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tag {
    constructor(user_id, post_id) {
        this.user_id = user_id;
        this.post_id = post_id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
}
exports.default = Tag;
