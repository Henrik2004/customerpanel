import {customerSchema} from "../schemas/customer.schema.js";

import {createCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer} from "../core/customer.js";


async function CustomersRoutes(fastify) {
    fastify.get('/', customerSchema, async (request, reply) => {
        const customers = getAllCustomers(fastify);
        if (!customers) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return customers;
    });

    fastify.get('/:id', customerSchema, async (request, reply) => {
        const customer = getCustomer(fastify, request.params.id);
        if (!customer) {
            reply.code(404);
            return {error: "Customer not found"};
        }
        return customer;
    });

    fastify.post('/', customerSchema, async (request, reply) => {
        const customerProps = request.body;
        const newCustomer = createCustomer(fastify, customerProps);
        if (!newCustomer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return newCustomer;
    });

    fastify.put('/:id', customerSchema, async (request, reply) => {
        const customerProps = request.body;
        const updatedCustomer = updateCustomer(fastify, request.params.id, customerProps);
        if (!updatedCustomer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return updatedCustomer;
    });

    fastify.delete('/:id', customerSchema, async (request, reply) => {
        const customer = getCustomer(fastify, request.params.id);
        if (!customer) {
            reply.code(404);
            return {error: "Customer not found"};
        }
        deleteCustomer(fastify, request.params.id);
        return {message: "Customer deleted"};
    });
}

export default CustomersRoutes;