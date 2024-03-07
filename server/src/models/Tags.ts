import DatabaseConnection from "../database/DatabaseConnection";

class Tag {
    static async getTags() {
        console.log('here');
        const dbconnection = new DatabaseConnection();
        const connection = dbconnection.getConnection();

        const query = 'SELECT * FROM tags';
        console.log('hereee');

        return new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                err ? reject(err) : resolve(res);
            });

            dbconnection.closeConnection();
        });
    }
}

export default Tag;