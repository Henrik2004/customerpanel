import {getUserByName} from "./user.js";

async function authenticateUser(fastify, name, password) {
    const user = getUserByName(fastify, name);

    if (!user || user.password !== password) {
        fastify.log.error('Invalid user or password');
        return null;
    }
    return user;
}

export {authenticateUser};