class Database {
    constructor() {
        if (!Database.instance) {
            this.connection = this.createConnection();
            Database.instance = this;
        }

        return Database.instance;
    }

    createConnection() {
        // Mock database connection
        return { connected: true };
    }

    getConnection() {
        return this.connection;
    }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
