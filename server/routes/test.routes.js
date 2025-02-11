import {loadTestData} from "../core/test.js";
import {runTestsSchema} from "../schemas/test.schema.js";
import {roleCheck} from "../middleware/roleCheck.js";

export async function TestRoutes(fastify) {
    fastify.post('/', {
        schema: runTestsSchema
    }, async (request, reply) => {
        const test = request.body.test;
        switch (test) {
            case "loadTestData":
                const result = loadTestData(fastify);
                if (!result) {
                    reply.code(500);
                    return {error: "Internal Server Error"};
                }
                return result;
            default:
                reply.code(400);
                return {error: "Invalid test"};
        }
    });
}