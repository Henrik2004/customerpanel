import {addLegacyDataSchema} from "../schemas/legacy.schema.js";
import {roleCheck} from "../middleware/roleCheck.js";
import {addLegacyData} from "../core/legacy.js";

export async function LegacyRoutes(fastify) {
    fastify.post('/', {
        schema: addLegacyDataSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const legacyData = addLegacyData(fastify, request.body);
        if (!legacyData) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        if (legacyData.error) {
            reply.code(400);
            return {error: legacyData.error};
        }
        reply.code(201);
        return legacyData;
    });
}