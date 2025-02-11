/**
 * Get all users from the database
 * @param fastify - Fastify instance
 * @returns {*|null} - array of users or null if an error occurred
 */
export function getAllUsers(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM users');

    try {
        return statement.all();
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get a single user from the database
 * @param fastify - instance of Fastify
 * @param id - user id
 * @returns {*|null} - user object or null if an error occurred
 */
export function getUser(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM users WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get user by name
 * @param fastify - instance of Fastify
 * @param name - user name
 * @returns {*|null} - user object or null if an error occurred
 */
export function getUserByName(fastify, name) {
    const statement = fastify.db.prepare('SELECT * FROM users WHERE name = ?');

    try {
        return statement.get(name);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a new user in the database
 * @param fastify - instance of Fastify
 * @param user - user object
 * @returns {*|null} - user object or null if an error occurred
 */
export function createUser(fastify, user) {
    const statement = fastify.db.prepare('INSERT INTO users (name, password, role, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)');

    try {
        const result = statement.run(user.name, user.password, user.role, user.createdBy, user.createdBy);
        const userId = result.changes === 1 ? result.lastInsertRowid : null;
        if (userId) {
            return getUser(fastify, userId);
        } else {
            fastify.log.error('Could not create user');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Update a user in the database
 * @param fastify - instance of Fastify
 * @param id - user id
 * @param user - user object
 * @returns {*|null} - user object or null if an error occurred
 */
export function updateUser(fastify, id, user) {
    const statement = fastify.db.prepare('UPDATE users SET name = ?, password = ?, role = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(user.name, user.password, user.role, user.updatedBy, id);
        if (result.changes === 1) {
            return getUser(fastify, id);
        } else {
            fastify.log.error('Could not update user');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Delete a user from the database
 * @param fastify - instance of Fastify
 * @param id - user id
 * @returns {boolean} - true if the user was deleted, false
 */
export function deleteUser(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM users WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return true;
        } else {
            fastify.log.error('Could not delete user');
            return false;
        }
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}