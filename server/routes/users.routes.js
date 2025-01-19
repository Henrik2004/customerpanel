import {
    createUserSchema, deleteUserSchema,
    getAllUsersSchema, getUserByNameSchema,
    getUserSchema,
    updateUserSchema,
    userSchema
} from '../schemas/user.schema.js';

import {createUser, deleteUser, getAllUsers, getUser, getUserByName, updateUser} from '../core/user.js';
import {roleCheck} from "../middleware/roleCheck.js";

async function UsersRoutes(fastify) {
    fastify.get('/', getAllUsersSchema, async (request, reply) => {
        const users = getAllUsers(fastify);
        if (!users) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return users;
    });

    fastify.get('/byid/:id', getUserSchema, async (request, reply) => {
        const user = getUser(fastify, request.params.id);
        if (!user) {
            reply.code(404);
            return {error: 'User not found'};
        }
        return {user: user};
    });

    fastify.get('/byname/:name', {
        schema: getUserByNameSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const name = request.params.name;
        const user = getUserByName(fastify, name);
        if (!user) {
            reply.code(404);
            return {error: 'User not found'};
        }
        return {user: user};
    });

    fastify.post('/', createUserSchema, async (request, reply) => {
        const userProps = request.body;
        const newUser = createUser(fastify, userProps);
        if (!newUser) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        reply.code(201);
        return {user: newUser};
    });

    fastify.put('/:id', updateUserSchema, async (request, reply) => {
        const userProps = request.body;
        const updatedUser = updateUser(fastify, request.params.id, userProps);
        if (!updatedUser) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        return {user: updatedUser};
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