export function getAllRoles(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM roles');

    try {
        const roles = statement.all();
        return {roles};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getRole(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM roles WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createRole(fastify, role) {
    const statement = fastify.db.prepare('INSERT INTO roles (name, canEdit, createdBy, updatedBy) VALUES (?, ?, ?, ?)');

    try {
        const result = statement.run(role.name, role.canEdit, role.createdBy, role.createdBy);
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

export function updateRole(fastify, id, role) {
    const statement = fastify.db.prepare('UPDATE roles SET name = ?, canEdit = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(role.name, role.canEdit, role.updatedBy, id);
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

export function deleteRole(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM roles WHERE id = ?');

    try {
        statement.run(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}