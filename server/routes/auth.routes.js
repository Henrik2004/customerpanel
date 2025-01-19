import {userSchema} from "../schemas/user.schema.js";
import {authenticateUser} from "../core/auth.js";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../app_config.js";

async function AuthRoutes(fastify) {
    fastify.post('/', {
        schema: userSchema
    }, async (request, reply) => {
        const {name, password} = request.body;

        const user = await authenticateUser(fastify, name, password);

        if (!user) {
            reply.code(401);
            return {error: "Invalid user or password"};
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, SECRET_KEY);
        return {token: token, userId: user.id};
    });
}

export {AuthRoutes};