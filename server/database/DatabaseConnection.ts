import mysql from 'mysql';

class DatabaseConnection{
    private connection: mysql.Connection;

    constructor()
    {
        this.connection = mysql.createConnection(
            {
                host:"localhost",
                user:"root",
                password:"root",
                database:"blog_database"
            }
        );

        this.connection.connect((err)=>{
            if(err)
            {
                console.log("There was an error connecting to the database");
            }
            else
            {
                console.log("Connection successful");
            }
        });
    }

    getConnection():mysql.Connection{
        return this.connection;
    }

    closeConnection():void{
        this.connection.end((err)=>{
            if(err)
            {
                console.log("There was an error closing the connection");
            }
            else{
                console.log("Connection closed successfully");
            }
        });
    }
}

export default DatabaseConnection;