import {SECRET_KEY} from "../app_config.js";
import jwt from 'jsonwebtoken';

export function roleCheck(requiredRole, fastify) {
    return async function (request, reply, done) {
        const {authorization} = request.headers;
        console.log('authorization', authorization);
        if (!authorization) {
            console.log('hi oben');
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }

        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            const userRole = parseInt(decoded.role);
            console.log('userRole', userRole);
            console.log('requiredRole', requiredRole);

            if (userRole !== requiredRole) {
                reply.code(403).send({ error: 'Forbidden' });
                return;
            }

            done(null);
        } catch (error) {
            console.log('error', error);
            console.log('hi unten');
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }
}