import {settingsSchema} from "../schemas/settings.schema.js";
import {coordinateSettings} from "../core/settings.js";
import {SETTINGS_SECRET} from "../app_config.js";
import {roleCheck} from "../middleware/roleCheck.js";

async function SettingsRoutes(fastify) {
    fastify.post('/', {
        schema: settingsSchema,
        //preHandler: roleCheck('1')
    }, async (request, reply) => {
        const action = request.body.action;
        const secret = request.body.secret;
        const data = request.body.data;

        if (secret !== SETTINGS_SECRET) {
            reply.code(401);
            return {error: 'Unauthorized'};
        }

        const result = coordinateSettings(action, data, fastify);
        if (!result) {
            reply.code(500);
            return {error: 'Internal Server Error'};
        }
        reply.code(200);
        return result;
    });
}

export default SettingsRoutes;