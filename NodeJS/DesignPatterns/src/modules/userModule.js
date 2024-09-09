const UserFactory = require('../factories/userFactory');
const UserObserver = require('../observers/userObserver');

function createUser(type, name) {
    const user = UserFactory.createUser(type, name);
    UserObserver.notify(`User created: ${user.name}, Role: ${user.role}`);
    return user;
}

module.exports = {
    createUser
};
