import { customerSchema } from "../schemas/customer.schema.js";

import {
    createCustomer,
    getAllCustomers,
    getCustomer
} from "../core/customer.js";


async function CustomersRoutes(fastify) {
    fastify.get('/', customerSchema, async (request, reply) => {
        const customers = getAllCustomers(fastify);
        if (!customers) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return customers;
    });

    fastify.get('/:id', customerSchema, async (request, reply) => {
        const customer = getCustomer(fastify, request.params.id);
        if (!customer) {
            reply.code(404);
            return { error: "Customer not found" };
        }
        return customer;
    });

    fastify.post('/', customerSchema, async (request, reply) => {
        const customerProps = request.body;
        const customer = {
            name: customerProps.name,
            email: customerProps.email,
            phone: customerProps.phone,
            address: customerProps.address,
            city: customerProps.city,
            country: customerProps.country,
            zip: customerProps.zip,
            company: customerProps.company
        }
        const newCustomer = createCustomer(fastify, customer);
        if (!newCustomer) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        reply.code(201);
        return newCustomer;
    });
}

export default CustomersRoutes;