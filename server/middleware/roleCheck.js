import {SECRET_KEY} from "../app_config.js";
import jwt from 'jsonwebtoken';

/**
 * Middleware to check the role of the user
 * @param requiredRole - the required role
 * @returns {(function(*, *, *): Promise<void>)|*} - the middleware function
 */
export function roleCheck(requiredRole) {
    return async function (request, reply, done) {
        const {authorization} = request.headers;
        if (!authorization) {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }

        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            const userRole = parseInt(decoded.role);

            if (userRole > requiredRole) {
                reply.code(403).send({ error: 'Forbidden' });
                return;
            }

            done(null);
        } catch (error) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }
}