import {userSchema} from "../schemas/user.schema.js";
import {authenticateUser} from "../core/auth.js";

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

        const token = fastify.jwt.sign({name: user.name, role: user.role});
        return {token: token};
    });
}

export {AuthRoutes};