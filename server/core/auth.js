import {getUserByName} from "./user.js";

/**
 * Authenticate user by name and password
 * @param fastify - Fastify instance
 * @param name - User name
 * @param password - User password
 * @returns {Promise<*|null>} - User object or null if user not found or password is invalid
 */
async function authenticateUser(fastify, name, password) {
    const user = getUserByName(fastify, name);

    if (!user || user.password !== password) {
        fastify.log.error('Invalid user or password');
        return null;
    }
    return user;
}

export {authenticateUser};