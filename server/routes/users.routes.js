import {
    createUserSchema, deleteUserSchema,
    getAllUsersSchema,
    getUserSchema,
    updateUserSchema,
    userSchema
} from '../schemas/user.schema.js';

import {createUser, deleteUser, getAllUsers, getUser, updateUser} from '../core/user.js';

async function UsersRoutes(fastify) {
    fastify.get('/', getAllUsersSchema, async (request, reply) => {
        const users = getAllUsers(fastify);
        if (!users) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return users;
    });

    fastify.get('/:id', getUserSchema, async (request, reply) => {
        const user = getUser(fastify, request.params.id);
        if (!user) {
            reply.code(404);
            return {error: 'User not found'};
        }
        return user;
    });

    fastify.post('/', createUserSchema, async (request, reply) => {
        const userProps = request.body;
        const newUser = createUser(fastify, userProps);
        if (!newUser) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        reply.code(201);
        return newUser;
    });

    fastify.put('/:id', updateUserSchema, async (request, reply) => {
        const userProps = request.body;
        const updatedUser = updateUser(fastify, request.params.id, userProps);
        if (!updatedUser) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return updatedUser;
    });

    fastify.delete('/:id', deleteUserSchema, async (request, reply) => {
        const user = getUser(fastify, request.params.id);
        if (!user) {
            reply.code(404);
            return {error: 'User not found'};
        }
        deleteUser(fastify, request.params.id);
        return {message: 'User deleted'};
    });
}

export default UsersRoutes;