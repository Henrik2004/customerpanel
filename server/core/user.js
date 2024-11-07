export function getAllUsers(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM users');

    try {
        const users = statement.all();
        return {users};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getUser(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM users WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

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