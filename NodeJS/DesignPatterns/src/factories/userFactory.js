class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}

class UserFactory {
    static createUser(type, name) {
        switch (type) {
            case 'admin':
                return new User(name, 'Admin');
            case 'guest':
                return new User(name, 'Guest');
            default:
                return new User(name, 'User');
        }
    }
}

module.exports = UserFactory;
