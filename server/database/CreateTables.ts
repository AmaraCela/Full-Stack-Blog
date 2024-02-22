import DatabaseConnection from "./DatabaseConnection";

class CreateTables {
    private connection: DatabaseConnection;
    constructor() {
        this.connection = new DatabaseConnection();
    }

    createUsers(): void {
        const usersCreateQuery = `CREATE TABLE IF NOT EXISTS users(
            user_id int NOT NULL AUTO_INCREMENT,
            username varchar(45) NOT NULL,
            email varchar(45) NOT NULL,
            password varchar(45) NOT NULL,
            PRIMARY KEY(user_id),
            UNIQUE KEY username_UNIQUE (username),
            UNIQUE KEY user_id_UNIQUE (user_id)
        );`

        this.connection.getConnection().query(usersCreateQuery, (err) => {
            if (err) {
                console.log("There was an error creating the users table");
                console.log(err);
            }
            else {
                console.log("Users table created successfully");
            }
            this.connection.closeConnection();
        });
    }

    createPosts(): void {
        const postsCreateQuery = `CREATE TABLE IF NOT EXISTS posts(
            post_id int NOT NULL AUTO_INCREMENT,
            title varchar(150) NOT NULL,
            description longtext,
            date_posted datetime NOT NULL,
            user_id int NOT NULL,
            PRIMARY KEY(post_id),
            KEY user_id (user_id),
            CONSTRAINT post_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
            );`;

        this.connection.getConnection().query(postsCreateQuery, (err) => {
            if (err) {
                console.log("There was an error creating the posts table");
                console.log(err);
            }
            else {
                console.log("Posts table created successfully");
            }
            this.connection.closeConnection();
        });
    }

    createImages(): void {
        const imagesCreateQuery = `CREATE TABLE IF NOT EXISTS images(
            post_id int NOT NULL,
            image longblob NOT NULL,
            PRIMARY KEY (post_id,image(100)),
            CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE ON UPDATE CASCADE          
        );`;

        this.connection.getConnection().query(imagesCreateQuery, (err) => {
            if (err) {
                console.log("There was an error creating the images table");
                console.log(err);
            }
            else {
                console.log("Images table created successfully");
            }
            this.connection.closeConnection();
        });
    }


    createTags(): void {
        const tagsCreateQuery = `CREATE TABLE IF NOT EXISTS tags(
            tag_id int NOT NULL AUTO_INCREMENT,
            tag_name varchar(50) NOT NULL,
            PRIMARY KEY (tag_id),
            UNIQUE KEY tag_name (tag_name)   
        );`;

        this.connection.getConnection().query(tagsCreateQuery, (err) => {
            if (err) {
                console.log("There was an error creating the tags table");
                console.log(err);
            }
            else {
                console.log("Tags table created successfully");
            }
            this.connection.closeConnection();
        });

    }

    createPostTags(): void {
        const postTagsCreateQuery = `CREATE TABLE IF NOT EXISTS post_tags(
            post_id int NOT NULL,
            tag_id int NOT NULL,
            PRIMARY KEY (post_id,tag_id),
            KEY tag_id (tag_id),
            CONSTRAINT post_tags_ibfk_1 FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT post_tags_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE ON UPDATE CASCADE
          
        );`;

        this.connection.getConnection().query(postTagsCreateQuery, (err) => {
            if (err) {
                console.log("There was an error creating the post_tags table");
                console.log(err);
            }
            else {
                console.log("post_tags table created successfully");
            }
            this.connection.closeConnection();
        });
    }

}

export default CreateTables;