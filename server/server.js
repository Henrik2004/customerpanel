import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMultipart from "@fastify/multipart";
import CustomersRoutes from "./routes/customers.routes.js";
import OffersRoutes from "./routes/offers.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import RolesRoutes from "./routes/roles.routes.js";
import connectDatabase from "./database/database.js";
import {
    createCustomerSchema,
    customerSchema,
    deleteCustomerSchema,
    getAllCustomersSchema,
    getCustomerSchema,
    updateCustomerSchema
} from "./schemas/customer.schema.js";
import {
    commentSchema,
    createCommentSchema,
    deleteCommentSchema,
    getAllCommentsSchema,
    getCommentSchema,
    updateCommentSchema
} from "./schemas/comment.schema.js";
import {
    changeOfferStatusSchema,
    createOfferSchema,
    deleteOfferSchema,
    getAllOffersSchema,
    getOfferSchema,
    offerSchema,
    updateOfferSchema
} from "./schemas/offer.schema.js";
import {
    createRoleSchema,
    deleteRoleSchema,
    getAllRolesSchema,
    getRoleSchema,
    roleSchema,
    updateRoleSchema
} from "./schemas/role.schema.js";
import {
    createDocumentSchema,
    deleteDocumentSchema,
    documentSchema,
    getAllDocumentsSchema,
    getDocumentSchema,
    updateDocumentSchema
} from "./schemas/document.schema.js";
import CommentsRoutes from "./routes/comments.routes.js";
import DocumentRoutes from "./routes/documents.routes.js";
import SettingsRoutes from "./routes/settings.routes.js";
import {settingsSchema} from "./schemas/settings.schema.js";
import {
    createUserSchema,
    deleteUserSchema,
    getAllUsersSchema,
    getUserSchema,
    updateUserSchema,
    userSchema
} from "./schemas/user.schema.js";
import {AuthRoutes} from "./routes/auth.routes.js";
import {addLegacyDataSchema, legacySchema} from "./schemas/legacy.schema.js";
import {LegacyRoutes} from "./routes/legacy.routes.js";

const server = Fastify({logger: true});

server.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
});

server.register(connectDatabase);
server.register(fastifyMultipart);
server.addSchema(customerSchema);
server.addSchema(createCustomerSchema);
server.addSchema(updateCustomerSchema);
server.addSchema(deleteCustomerSchema);
server.addSchema(getCustomerSchema);
server.addSchema(getAllCustomersSchema);
server.addSchema(commentSchema);
server.addSchema(createCommentSchema);
server.addSchema(updateCommentSchema);
server.addSchema(deleteCommentSchema);
server.addSchema(getCommentSchema);
server.addSchema(getAllCommentsSchema);
server.addSchema(documentSchema);
server.addSchema(createDocumentSchema);
server.addSchema(updateDocumentSchema);
server.addSchema(deleteDocumentSchema);
server.addSchema(getDocumentSchema);
server.addSchema(getAllDocumentsSchema);
server.addSchema(offerSchema);
server.addSchema(createOfferSchema);
server.addSchema(updateOfferSchema);
server.addSchema(deleteOfferSchema);
server.addSchema(getOfferSchema);
server.addSchema(getAllOffersSchema);
server.addSchema(changeOfferStatusSchema);
server.addSchema(roleSchema);
server.addSchema(createRoleSchema);
server.addSchema(updateRoleSchema);
server.addSchema(deleteRoleSchema);
server.addSchema(getRoleSchema);
server.addSchema(getAllRolesSchema);
server.addSchema(userSchema);
server.addSchema(createUserSchema);
server.addSchema(updateUserSchema);
server.addSchema(deleteUserSchema);
server.addSchema(getUserSchema);
server.addSchema(getAllUsersSchema);
server.addSchema(settingsSchema);
server.addSchema(legacySchema);
server.addSchema(addLegacyDataSchema);

server.register(CustomersRoutes, {prefix: '/customers'});
server.register(CommentsRoutes, {prefix: '/comments'});
server.register(DocumentRoutes, {prefix: '/documents'});
server.register(OffersRoutes, {prefix: '/offers'});
server.register(UsersRoutes, {prefix: '/users'});
server.register(RolesRoutes, {prefix: '/roles'});
server.register(SettingsRoutes, {prefix: '/settings'});
server.register(AuthRoutes, {prefix: '/auth'});
server.register(LegacyRoutes, {prefix: '/legacy'});

server.listen({port: 8080}, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
});
