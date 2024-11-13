import Fastify from 'fastify';
import cors from '@fastify/cors';
import CustomersRoutes from "./routes/customers.routes.js";
import OffersRoutes from "./routes/offers.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import RolesRoutes from "./routes/roles.routes.js";
import connectDatabase from "./database/database.js";
import { customerSchema } from "./schemas/customer.schema.js";

const server = Fastify({ logger: true });

server.addSchema(customerSchema);

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

server.register(CustomersRoutes, { prefix: '/customers' });
server.register(OffersRoutes, { prefix: '/offers' });
server.register(UsersRoutes, { prefix: '/users' });
server.register(RolesRoutes, { prefix: '/roles' });

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
});
