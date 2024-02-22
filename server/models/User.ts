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

}

export default User;