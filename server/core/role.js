/**
 * Get all roles from the database
 * @param fastify - Fastify instance
 * @returns {*|null} - the roles or null
 */
export function getAllRoles(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM roles');

    try {
        return statement.all();
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get a single role from the database
 * @param fastify - instance of Fastify
 * @param id - role id
 * @returns {*|null} - role object or null if an error occurred
 */
export function getRole(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM roles WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a new role in the database
 * @param fastify - instance of Fastify
 * @param role - role object
 * @returns {*|null} - role object or null if an error occurred
 */
export function createRole(fastify, role) {
    const statement = fastify.db.prepare('INSERT INTO roles (name, canEdit, createdBy, updatedBy) VALUES (?, ?, ?, ?)');
    const canEdit = role.canEdit ? 1 : 0;
    try {
        const result = statement.run(role.name, canEdit, role.createdBy, role.createdBy);
        const roleId = result.changes === 1 ? result.lastInsertRowid : null;
        if (roleId) {
            return getRole(fastify, roleId);
        } else {
            fastify.log.error('Could not create role');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Update a role in the database
 * @param fastify - instance of Fastify
 * @param id - role id
 * @param role - role object
 * @returns {*|null} - role object or null if an error occurred
 */
export function updateRole(fastify, id, role) {
    const statement = fastify.db.prepare('UPDATE roles SET name = ?, canEdit = ?, updatedBy = ? WHERE id = ?');
    const canEdit = role.canEdit ? 1 : 0;
    try {
        const result = statement.run(role.name, canEdit, role.updatedBy, id);
        if (result.changes === 1) {
            return getRole(fastify, id);
        } else {
            fastify.log.error('Could not update role');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Delete a role from the database
 * @param fastify - instance of Fastify
 * @param id - role id
 * @returns {null} - null if an error occurred
 */
export function deleteRole(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM roles WHERE id = ?');

    try {
        statement.run(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}