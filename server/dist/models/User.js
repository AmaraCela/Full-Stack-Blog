"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user_id, username, email, password) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getUserId() {
        return this.user_id;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = User;
