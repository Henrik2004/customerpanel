import { customerSchema } from "../schemas/customer.schema.js";

import { getAllCustomers } from "../core/customer.js";


async function CustomersRoutes(fastify) {
    fastify.get('/', customerSchema, async (request, reply) => {
        const customers = getAllCustomers(fastify);
        if (!customers) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return customers;
    });
}

export default CustomersRoutes;