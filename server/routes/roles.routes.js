import {
    createRoleSchema, deleteRoleSchema,
    getAllRolesSchema,
    getRoleSchema,
    roleSchema,
    updateRoleSchema
} from '../schemas/role.schema.js';

import {createRole, deleteRole, getAllRoles, getRole, updateRole} from '../core/role.js';

/**
 * Roles routes
 * GET all roles
 * GET role by id
 * POST create role
 * PUT update role
 * DELETE role
 * @param fastify
 * @returns {Promise<void>}
 * @constructor
 */
async function RolesRoutes(fastify) {
    fastify.get('/', getAllRolesSchema, async (request, reply) => {
        const roles = getAllRoles(fastify);
        if (!roles) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return roles;
    });

    fastify.get('/:id', getRoleSchema, async (request, reply) => {
        const role = getRole(fastify, request.params.id);
        if (!role) {
            reply.code(404);
            return {error: 'Role not found'};
        }
        return role;
    });

    fastify.post('/', createRoleSchema, async (request, reply) => {
        const roleProps = request.body;
        const newRole = createRole(fastify, roleProps);
        if (!newRole) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        reply.code(201);
        return newRole;
    });

    fastify.put('/:id', updateRoleSchema, async (request, reply) => {
        const roleProps = request.body;
        const updatedRole = updateRole(fastify, request.params.id, roleProps);
        if (!updatedRole) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return updatedRole;
    });

    fastify.delete('/:id', deleteRoleSchema, async (request, reply) => {
        const role = getRole(fastify, request.params.id);
        if (!role) {
            reply.code(404);
            return {error: 'Role not found'};
        }
        deleteRole(fastify, request.params.id);
        return {message: 'Role deleted'};
    });
}

export default RolesRoutes;